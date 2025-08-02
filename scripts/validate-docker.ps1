# Docker Validation Script for SVG MCP Server (PowerShell)
# Validates Docker configuration and build process

param(
    [switch]$SkipBuild,
    [switch]$Verbose
)

# Script configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$ImageName = "svg-mcp-server"
$TestContainer = "svg-mcp-test"

# Test results tracking
$TestsPassed = 0
$TestsFailed = 0

# Color functions
function Write-Info($Message) {
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success($Message) {
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning($Message) {
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-ErrorMessage($Message) {
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Run test and track results
function Invoke-Test {
    param(
        [string]$TestName,
        [scriptblock]$TestScript
    )
    
    Write-Info "Running test: $TestName"
    
    try {
        $result = & $TestScript
        if ($result -eq $false -or $LASTEXITCODE -ne 0) {
            throw "Test failed"
        }
        Write-Success "PASS: $TestName"
        $script:TestsPassed++
        return $true
    }
    catch {
        Write-ErrorMessage "FAIL: $TestName"
        if ($Verbose) {
            Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
        }
        $script:TestsFailed++
        return $false
    }
}

# Check if Docker is available
function Test-DockerAvailable {
    try {
        docker --version | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Check if Docker daemon is running
function Test-DockerDaemon {
    try {
        $ErrorActionPreference = "Stop"
        docker info 2>$null | Out-Null
        return ($LASTEXITCODE -eq 0)
    }
    catch {
        return $false
    }
}

# Check if required files exist
function Test-FilesExist {
    $RequiredFiles = @(
        "$ProjectRoot\docker\Dockerfile",
        "$ProjectRoot\docker\docker-compose.yml",
        "$ProjectRoot\docker\.dockerignore",
        "$ProjectRoot\scripts\docker.sh",
        "$ProjectRoot\scripts\docker.ps1",
        "$ProjectRoot\package.json",
        "$ProjectRoot\tsconfig.json"
    )
    
    foreach ($File in $RequiredFiles) {
        if (-not (Test-Path $File)) {
            Write-ErrorMessage "Required file missing: $File"
            return $false
        } else {
            if ($Verbose) {
                Write-Host "Found: $File" -ForegroundColor Green
            }
        }
    }
    
    return $true
}

# Validate Docker Compose configuration
function Test-ComposeConfig {
    Set-Location $ProjectRoot
    
    try {
        docker-compose --file docker/docker-compose.yml config | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Test Docker build
function Test-DockerBuild {
    if ($SkipBuild) {
        Write-Info "Skipping Docker build test (SkipBuild flag set)"
        return $true
    }
    
    Set-Location $ProjectRoot
    
    try {
        # Test production build
        Write-Info "Building production image..."
        docker build --file docker/Dockerfile --tag "${ImageName}:test" --target production . | Out-Null
        
        # Test development build
        Write-Info "Building development image..."
        docker build --file docker/Dockerfile --tag "${ImageName}:test-dev" --target builder . | Out-Null
        
        return $true
    }
    catch {
        return $false
    }
}

# Test container run
function Test-ContainerRun {
    if ($SkipBuild) {
        Write-Info "Skipping container run test (SkipBuild flag set)"
        return $true
    }
    
    try {
        # Clean up any existing test container
        docker stop $TestContainer 2>$null | Out-Null
        docker rm $TestContainer 2>$null | Out-Null
        
        # Start test container
        Write-Info "Starting test container..."
        docker run --name $TestContainer --detach --env NODE_ENV=production "${ImageName}:test" | Out-Null
        
        # Wait for container to start
        Start-Sleep 5
        
        # Check if container is running
        $ContainerRunning = docker ps --filter "name=$TestContainer" --format "{{.Names}}" | Select-String $TestContainer
        if (-not $ContainerRunning) {
            throw "Container is not running"
        }
        
        # Check container health
        Write-Info "Testing container health..."
        docker exec $TestContainer node -e "console.log('Health check')" | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Container health check failed"
        }
        
        return $true
    }
    finally {
        # Clean up test container
        docker stop $TestContainer 2>$null | Out-Null
        docker rm $TestContainer 2>$null | Out-Null
    }
}

# Validate Dockerfile syntax
function Test-DockerfileSyntax {
    Set-Location $ProjectRoot
    
    try {
        # Use docker build to validate syntax (without dry-run flag which is not supported in older Docker versions)
        $BuildOutput = docker build --file docker/Dockerfile --target production --no-cache --progress=plain . 2>&1 | Select-String -Pattern "error|Error|ERROR" | Select-Object -First 5
        if ($BuildOutput) {
            if ($Verbose) {
                Write-Host "Build errors found: $BuildOutput" -ForegroundColor Red
            }
            return $false
        }
        return $true
    }
    catch {
        return $false
    }
}

# Clean up test images
function Remove-TestImages {
    try {
        docker rmi "${ImageName}:test" 2>$null | Out-Null
        docker rmi "${ImageName}:test-dev" 2>$null | Out-Null
    }
    catch {
        # Ignore cleanup errors
    }
}

# Main validation function
function Main {
    Write-Info "Starting Docker validation for SVG MCP Server"
    Write-Host ""
    
    # Always run basic file checks
    if (Test-FilesExist) {
        Write-Success "PASS: Required files exist"
        $script:TestsPassed++
    } else {
        Write-ErrorMessage "FAIL: Required files exist"
        $script:TestsFailed++
    }
    
    # Check if Docker is available
    if (-not (Test-DockerAvailable)) {
        Write-Warning "Docker is not installed or not in PATH"
        Write-Info "Skipping Docker-dependent tests"
    }
    elseif (-not (Test-DockerDaemon)) {
        Write-Warning "Docker daemon is not running"
        Write-Info "Skipping Docker-dependent tests"
    }
    else {
        Write-Info "Docker is available and running"
        
        # Run Docker-dependent tests
        Invoke-Test "Dockerfile syntax validation" { Test-DockerfileSyntax }
        Invoke-Test "Docker Compose configuration" { Test-ComposeConfig }
        
        if (-not $SkipBuild) {
            Invoke-Test "Docker build test" { Test-DockerBuild }
            Invoke-Test "Container startup and health" { Test-ContainerRun }
        }
        
        # Clean up after tests
        Remove-TestImages
    }
    
    # Display results
    Write-Host ""
    Write-Info "Validation Results:"
    Write-Host "  Tests passed: $TestsPassed"
    Write-Host "  Tests failed: $TestsFailed"
    
    if ($TestsFailed -eq 0) {
        Write-Success "All Docker validation tests passed!"
        exit 0
    }
    else {
        Write-ErrorMessage "Some Docker validation tests failed"
        exit 1
    }
}

# Run main function
Main
