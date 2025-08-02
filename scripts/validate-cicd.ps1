# CI/CD Pipeline Validation Script for SVG MCP Server (PowerShell)
# Validates GitHub Actions workflow files and CI/CD configuration

param(
    [switch]$Verbose
)

# Script configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

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
        if ($result -eq $false) {
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

# Check if required workflow files exist
function Test-WorkflowFiles {
    $RequiredWorkflows = @(
        "$ProjectRoot\.github\workflows\ci.yml",
        "$ProjectRoot\.github\workflows\release.yml",
        "$ProjectRoot\.github\workflows\dependencies.yml",
        "$ProjectRoot\.github\workflows\code-quality.yml"
    )
    
    foreach ($Workflow in $RequiredWorkflows) {
        if (-not (Test-Path $Workflow)) {
            Write-ErrorMessage "Required workflow file missing: $Workflow"
            return $false
        } else {
            if ($Verbose) {
                Write-Host "Found: $Workflow" -ForegroundColor Green
            }
        }
    }
    
    return $true
}

# Validate YAML syntax of workflow files
function Test-YamlSyntax {
    $WorkflowsDir = "$ProjectRoot\.github\workflows"
    
    if (-not (Get-Command yq -ErrorAction SilentlyContinue)) {
        Write-Warning "yq not available, skipping YAML syntax validation"
        return $true
    }
    
    $WorkflowFiles = Get-ChildItem -Path $WorkflowsDir -Filter "*.yml"
    
    foreach ($Workflow in $WorkflowFiles) {
        try {
            $null = yq eval '.' $Workflow.FullName 2>$null
            if ($LASTEXITCODE -ne 0) {
                Write-ErrorMessage "Invalid YAML syntax in $($Workflow.Name)"
                return $false
            }
        }
        catch {
            Write-ErrorMessage "Error validating YAML syntax in $($Workflow.Name)"
            return $false
        }
    }
    
    return $true
}

# Check if package.json has required scripts
function Test-NpmScripts {
    $PackageJson = "$ProjectRoot\package.json"
    
    if (-not (Test-Path $PackageJson)) {
        Write-ErrorMessage "package.json not found"
        return $false
    }
    
    try {
        $PackageContent = Get-Content $PackageJson | ConvertFrom-Json
        
        $RequiredScripts = @(
            "build",
            "test",
            "test:unit",
            "test:integration",
            "test:performance",
            "test:security",
            "test:compliance",
            "test:coverage",
            "lint",
            "type-check"
        )
        
        foreach ($Script in $RequiredScripts) {
            if (-not $PackageContent.scripts.$Script) {
                Write-ErrorMessage "Required npm script missing: $Script"
                return $false
            }
        }
        
        return $true
    }
    catch {
        Write-ErrorMessage "Error reading package.json"
        return $false
    }
}

# Check SonarCloud configuration
function Test-SonarCloudConfig {
    $SonarConfig = "$ProjectRoot\sonar-project.properties"
    
    if (-not (Test-Path $SonarConfig)) {
        Write-Warning "SonarCloud configuration not found: $SonarConfig"
        return $true
    }
    
    $SonarContent = Get-Content $SonarConfig
    
    $RequiredProps = @(
        "sonar.projectKey",
        "sonar.organization",
        "sonar.sources",
        "sonar.tests"
    )
    
    foreach ($Prop in $RequiredProps) {
        $Found = $SonarContent | Where-Object { $_ -match "^$Prop=" }
        if (-not $Found) {
            Write-ErrorMessage "Required SonarCloud property missing: $Prop"
            return $false
        }
    }
    
    return $true
}

# Validate workflow triggers
function Test-WorkflowTriggers {
    $CiWorkflow = "$ProjectRoot\.github\workflows\ci.yml"
    
    if (-not (Test-Path $CiWorkflow)) {
        return $false
    }
    
    $WorkflowContent = Get-Content $CiWorkflow -Raw
    
    if ($WorkflowContent -notmatch "push:") {
        Write-ErrorMessage "CI workflow missing push trigger"
        return $false
    }
    
    if ($WorkflowContent -notmatch "pull_request:") {
        Write-ErrorMessage "CI workflow missing pull_request trigger"
        return $false
    }
    
    return $true
}

# Check environment configuration
function Test-EnvironmentConfig {
    $WorkflowsDir = "$ProjectRoot\.github\workflows"
    
    $WorkflowFiles = Get-ChildItem -Path $WorkflowsDir -Filter "*.yml"
    $NodeVersionFound = $false
    $SecretsFound = $false
    
    foreach ($Workflow in $WorkflowFiles) {
        $Content = Get-Content $Workflow.FullName -Raw
        
        if ($Content -match "NODE_VERSION:") {
            $NodeVersionFound = $true
        }
        
        if ($Content -match "secrets\.") {
            $SecretsFound = $true
        }
    }
    
    if (-not $NodeVersionFound) {
        Write-Warning "NODE_VERSION not defined in workflows"
    }
    
    if ($SecretsFound) {
        Write-Info "Workflows use GitHub secrets (good practice)"
    }
    
    return $true
}

# Check for Docker integration
function Test-DockerIntegration {
    $CiWorkflow = "$ProjectRoot\.github\workflows\ci.yml"
    
    if (-not (Test-Path $CiWorkflow)) {
        return $false
    }
    
    $WorkflowContent = Get-Content $CiWorkflow -Raw
    
    if ($WorkflowContent -match "docker") {
        Write-Info "CI workflow includes Docker integration"
    } else {
        Write-Warning "CI workflow does not include Docker integration"
    }
    
    return $true
}

# Main validation function
function Main {
    Write-Info "Starting CI/CD pipeline validation for SVG MCP Server"
    Write-Host ""
    
    # Run validation tests
    Invoke-Test "Required workflow files exist" { Test-WorkflowFiles }
    Invoke-Test "YAML syntax validation" { Test-YamlSyntax }
    Invoke-Test "NPM scripts validation" { Test-NpmScripts }
    Invoke-Test "SonarCloud configuration" { Test-SonarCloudConfig }
    Invoke-Test "Workflow triggers validation" { Test-WorkflowTriggers }
    Invoke-Test "Environment configuration" { Test-EnvironmentConfig }
    Invoke-Test "Docker integration check" { Test-DockerIntegration }
    
    # Display results
    Write-Host ""
    Write-Info "Validation Results:"
    Write-Host "  Tests passed: $TestsPassed"
    Write-Host "  Tests failed: $TestsFailed"
    
    if ($TestsFailed -eq 0) {
        Write-Success "All CI/CD validation tests passed!"
        exit 0
    } else {
        Write-ErrorMessage "Some CI/CD validation tests failed"
        exit 1
    }
}

# Run main function
Main
