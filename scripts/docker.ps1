# SVG MCP Server Docker Management (PowerShell)
# Provides convenient commands for Docker operations on Windows

param(
    [Parameter(Position=0)]
    [ValidateSet("build", "build-dev", "run", "run-dev", "test", "shell", "logs", "stop", "clean", "health", "stats", "help")]
    [string]$Command = "help"
)

# Script configuration
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$ImageName = "svg-mcp-server"
$ContainerName = "svg-mcp-server"

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

function Write-Error($Message) {
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Help function
function Show-Help {
    Write-Host "SVG MCP Server Docker Management" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Usage: .\docker.ps1 [COMMAND]"
    Write-Host ""
    Write-Host "Commands:"
    Write-Host "  build       Build production Docker image"
    Write-Host "  build-dev   Build development Docker image"
    Write-Host "  run         Run production container"
    Write-Host "  run-dev     Run development container"
    Write-Host "  test        Run tests in container"
    Write-Host "  shell       Open shell in running container"
    Write-Host "  logs        View container logs"
    Write-Host "  stop        Stop running container"
    Write-Host "  clean       Remove containers and images"
    Write-Host "  health      Check container health"
    Write-Host "  stats       Show container resource usage"
    Write-Host "  help        Show this help message"
    Write-Host ""
}

# Check if Docker is running
function Test-Docker {
    try {
        docker info | Out-Null
        return $true
    }
    catch {
        Write-Error "Docker is not running. Please start Docker and try again."
        exit 1
    }
}

# Build production image
function Build-Image {
    Write-Info "Building production Docker image..."
    Set-Location $ProjectRoot
    
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    
    docker build `
        --file docker/Dockerfile `
        --tag "${ImageName}:latest" `
        --tag "${ImageName}:$timestamp" `
        --target production `
        .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production image built successfully"
    } else {
        Write-Error "Failed to build production image"
        exit 1
    }
}

# Build development image
function Build-DevImage {
    Write-Info "Building development Docker image..."
    Set-Location $ProjectRoot
    
    docker build `
        --file docker/Dockerfile `
        --tag "${ImageName}:dev" `
        --target builder `
        .
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Development image built successfully"
    } else {
        Write-Error "Failed to build development image"
        exit 1
    }
}

# Run production container
function Start-Container {
    Write-Info "Starting production container..."
    
    # Stop existing container if running
    docker stop $ContainerName 2>$null | Out-Null
    docker rm $ContainerName 2>$null | Out-Null
    
    docker run `
        --name $ContainerName `
        --detach `
        --restart unless-stopped `
        --memory 512m `
        --cpus 1.0 `
        --read-only `
        --tmpfs /tmp:rw,size=100M `
        --security-opt no-new-privileges:true `
        --env NODE_ENV=production `
        --env MCP_TRANSPORT=stdio `
        --env LOG_LEVEL=info `
        "${ImageName}:latest"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production container started: $ContainerName"
    } else {
        Write-Error "Failed to start production container"
        exit 1
    }
}

# Run development container
function Start-DevContainer {
    Write-Info "Starting development container..."
    Set-Location $ProjectRoot
    
    docker-compose `
        --file docker/docker-compose.yml `
        --profile dev `
        up --detach svg-mcp-server-dev
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Development container started"
    } else {
        Write-Error "Failed to start development container"
        exit 1
    }
}

# Run tests in container
function Start-Tests {
    Write-Info "Running tests in container..."
    Set-Location $ProjectRoot
    
    docker-compose `
        --file docker/docker-compose.yml `
        --profile test `
        run --rm svg-mcp-server-test
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Tests completed"
    } else {
        Write-Error "Tests failed"
        exit 1
    }
}

# Open shell in container
function Open-Shell {
    Write-Info "Opening shell in container..."
    
    $running = docker ps --format "table {{.Names}}" | Select-String "^$ContainerName$"
    if ($running) {
        docker exec -it $ContainerName /bin/sh
    } else {
        Write-Error "Container '$ContainerName' is not running"
        exit 1
    }
}

# View container logs
function Show-Logs {
    Write-Info "Viewing container logs..."
    
    $running = docker ps --format "table {{.Names}}" | Select-String "^$ContainerName$"
    if ($running) {
        docker logs -f $ContainerName
    } else {
        Write-Error "Container '$ContainerName' is not running"
        exit 1
    }
}

# Stop container
function Stop-Container {
    Write-Info "Stopping container..."
    
    docker stop $ContainerName 2>$null | Out-Null
    docker rm $ContainerName 2>$null | Out-Null
    
    Write-Success "Container stopped and removed"
}

# Clean up containers and images
function Remove-All {
    Write-Warning "This will remove all containers and images for $ImageName"
    $confirmation = Read-Host "Are you sure? (y/N)"
    
    if ($confirmation -eq "y" -or $confirmation -eq "Y") {
        Write-Info "Cleaning up containers and images..."
        
        # Stop and remove containers
        docker stop $ContainerName 2>$null | Out-Null
        docker rm $ContainerName 2>$null | Out-Null
        
        # Remove images
        docker rmi "${ImageName}:latest" 2>$null | Out-Null
        docker rmi "${ImageName}:dev" 2>$null | Out-Null
        
        # Remove tagged images
        $images = docker images $ImageName --format "table {{.Repository}}:{{.Tag}}" | Select-Object -Skip 1
        foreach ($image in $images) {
            if ($image) {
                docker rmi $image 2>$null | Out-Null
            }
        }
        
        # Clean up Docker system
        docker system prune -f 2>$null | Out-Null
        
        Write-Success "Cleanup completed"
    } else {
        Write-Info "Cleanup cancelled"
    }
}

# Check container health
function Test-Health {
    Write-Info "Checking container health..."
    
    $running = docker ps --format "table {{.Names}}" | Select-String "^$ContainerName$"
    if ($running) {
        try {
            $health = docker inspect --format='{{.State.Health.Status}}' $ContainerName 2>$null
            if ($health) {
                Write-Info "Health status: $health"
            } else {
                Write-Warning "Health check not available"
            }
            
            docker exec $ContainerName node -e "console.log('Container is responsive')" 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Container is healthy"
            }
        }
        catch {
            Write-Warning "Could not check container health"
        }
    } else {
        Write-Error "Container '$ContainerName' is not running"
        exit 1
    }
}

# Show container stats
function Show-Stats {
    Write-Info "Container resource usage:"
    
    $running = docker ps --format "table {{.Names}}" | Select-String "^$ContainerName$"
    if ($running) {
        docker stats --no-stream $ContainerName
    } else {
        Write-Error "Container '$ContainerName' is not running"
        exit 1
    }
}

# Main command handling
Test-Docker

switch ($Command) {
    "build" { Build-Image }
    "build-dev" { Build-DevImage }
    "run" { Start-Container }
    "run-dev" { Start-DevContainer }
    "test" { Start-Tests }
    "shell" { Open-Shell }
    "logs" { Show-Logs }
    "stop" { Stop-Container }
    "clean" { Remove-All }
    "health" { Test-Health }
    "stats" { Show-Stats }
    "help" { Show-Help }
    default {
        Write-Error "Unknown command: $Command"
        Write-Host ""
        Show-Help
        exit 1
    }
}
