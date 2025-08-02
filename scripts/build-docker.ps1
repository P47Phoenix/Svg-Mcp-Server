# Docker Build Script for SVG MCP Server (Windows PowerShell)
# Reads version from VERSION file and builds Docker image

param(
    [switch]$Test = $false,
    [switch]$Push = $false,
    [string]$Registry = ""
)

# Get script directory and project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir

# Read version from VERSION file
$VersionFile = Join-Path $ProjectRoot "VERSION"
if (Test-Path $VersionFile) {
    $Version = (Get-Content $VersionFile).Trim()
    Write-Host "Building SVG MCP Server version: $Version" -ForegroundColor Green
} else {
    Write-Error "VERSION file not found at $VersionFile"
    exit 1
}

# Validate version format (semantic versioning)
if ($Version -notmatch '^\d+\.\d+\.\d+$') {
    Write-Warning "Version '$Version' doesn't follow semantic versioning (x.y.z)"
}

# Get Git commit hash
try {
    $VcsRef = (git rev-parse --short HEAD 2>$null)
    if (-not $VcsRef) { $VcsRef = "unknown" }
} catch {
    $VcsRef = "unknown"
}

# Build Docker image
$BuildDate = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$ImageName = "svg-mcp-server"
$DockerFile = Join-Path $ProjectRoot "docker\Dockerfile"

Write-Host "Building Docker image: $ImageName`:$Version" -ForegroundColor Cyan

$BuildArgs = @(
    "--build-arg", "VERSION=$Version",
    "--build-arg", "BUILD_DATE=$BuildDate",
    "--build-arg", "VCS_REF=$VcsRef",
    "-t", "$ImageName`:$Version",
    "-t", "$ImageName`:latest",
    "-f", $DockerFile,
    $ProjectRoot
)

try {
    & docker build @BuildArgs
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully built Docker image: $ImageName`:$Version" -ForegroundColor Green
        Write-Host "📦 Image also tagged as: $ImageName`:latest" -ForegroundColor Green
        
        # Show image info
        Write-Host "`n📋 Image Information:" -ForegroundColor Yellow
        & docker images $ImageName`:$Version --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}"
        
        # Optional: Test container
        if ($Test) {
            Write-Host "`n🧪 Testing container..." -ForegroundColor Cyan
            & docker run --rm $ImageName`:$Version node -e "console.log('SVG MCP Server $Version is working!')"
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Container test passed!" -ForegroundColor Green
            } else {
                Write-Error "❌ Container test failed!"
            }
        }
        
        # Optional: Push to registry
        if ($Push -and $Registry) {
            Write-Host "`n🚀 Pushing to registry: $Registry" -ForegroundColor Cyan
            & docker tag $ImageName`:$Version $Registry/$ImageName`:$Version
            & docker tag $ImageName`:latest $Registry/$ImageName`:latest
            & docker push $Registry/$ImageName`:$Version
            & docker push $Registry/$ImageName`:latest
            Write-Host "✅ Images pushed to registry!" -ForegroundColor Green
        }
        
    } else {
        Write-Error "❌ Docker build failed!"
        exit 1
    }
} catch {
    Write-Error "❌ Docker build failed: $_"
    exit 1
}
