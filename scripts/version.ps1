# Version Management Script for SVG MCP Server (PowerShell)

param(
    [Parameter(Position=0)]
    [string]$Command = "get",
    
    [Parameter(Position=1)]
    [string]$Value = ""
)

# Get script directory and project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent $ScriptDir
$VersionFile = Join-Path $ProjectRoot "VERSION"

function Show-Help {
    Write-Host @"
Version Management Script for SVG MCP Server

Usage: .\version.ps1 [command] [options]

Commands:
    get                     Show current version
    set <version>          Set new version (x.y.z format)
    bump <part>            Bump version part (major|minor|patch)
    docker                 Build Docker image with current version
    release                Tag and build release

Examples:
    .\version.ps1 get                 # Shows: 1.0.0
    .\version.ps1 set 1.2.3          # Sets version to 1.2.3
    .\version.ps1 bump patch         # 1.0.0 -> 1.0.1
    .\version.ps1 bump minor         # 1.0.1 -> 1.1.0
    .\version.ps1 bump major         # 1.1.0 -> 2.0.0
    .\version.ps1 docker             # Build Docker image with current version
    .\version.ps1 release            # Tag git repo and build Docker image

"@ -ForegroundColor Cyan
}

function Get-Version {
    if (Test-Path $VersionFile) {
        return (Get-Content $VersionFile).Trim()
    } else {
        Write-Error "VERSION file not found at $VersionFile"
        exit 1
    }
}

function Set-Version {
    param([string]$NewVersion)
    
    if ($NewVersion -notmatch '^\d+\.\d+\.\d+$') {
        Write-Error "Version must be in x.y.z format (semantic versioning)"
        exit 1
    }
    
    Set-Content -Path $VersionFile -Value $NewVersion
    Write-Host "✅ Version set to: $NewVersion" -ForegroundColor Green
    
    # Update package.json if it exists
    $PackageJson = Join-Path $ProjectRoot "package.json"
    if (Test-Path $PackageJson) {
        try {
            $package = Get-Content $PackageJson | ConvertFrom-Json
            $package.version = $NewVersion
            $package | ConvertTo-Json -Depth 100 | Set-Content $PackageJson
            Write-Host "✅ Updated package.json version" -ForegroundColor Green
        } catch {
            Write-Warning "Failed to update package.json: $_"
        }
    }
}

function Invoke-BumpVersion {
    param([string]$Part)
    
    $currentVersion = Get-Version
    $versionParts = $currentVersion.Split('.')
    
    if ($versionParts.Length -ne 3) {
        Write-Error "Invalid version format: $currentVersion"
        exit 1
    }
    
    $major = [int]$versionParts[0]
    $minor = [int]$versionParts[1]
    $patch = [int]$versionParts[2]
    
    switch ($Part.ToLower()) {
        "major" {
            $major++
            $minor = 0
            $patch = 0
        }
        "minor" {
            $minor++
            $patch = 0
        }
        "patch" {
            $patch++
        }
        default {
            Write-Error "Invalid part '$Part'. Use: major, minor, or patch"
            exit 1
        }
    }
    
    $newVersion = "$major.$minor.$patch"
    Set-Version $newVersion
    Write-Host "📈 Bumped $Part`: $currentVersion -> $newVersion" -ForegroundColor Yellow
}

function Invoke-DockerBuild {
    $buildScript = Join-Path $ScriptDir "build-docker.ps1"
    
    if (Test-Path $buildScript) {
        Write-Host "🐳 Building Docker image..." -ForegroundColor Cyan
        & $buildScript
    } else {
        Write-Error "Docker build script not found at $buildScript"
        exit 1
    }
}

function New-Release {
    $version = Get-Version
    
    Write-Host "🚀 Creating release for version $version" -ForegroundColor Cyan
    
    # Check if git repo
    try {
        git rev-parse --git-dir 2>$null | Out-Null
    } catch {
        Write-Error "Not a git repository"
        exit 1
    }
    
    # Check for uncommitted changes
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Error "Uncommitted changes found. Please commit or stash them first."
        exit 1
    }
    
    # Create git tag
    try {
        git tag -a "v$version" -m "Release version $version"
        Write-Host "✅ Created git tag: v$version" -ForegroundColor Green
    } catch {
        Write-Error "Failed to create git tag: $_"
        exit 1
    }
    
    # Build Docker image
    Invoke-DockerBuild
    
    Write-Host "🎉 Release $version completed!" -ForegroundColor Green
    Write-Host "   Git tag: v$version" -ForegroundColor Gray
    Write-Host "   Docker image: svg-mcp-server:$version" -ForegroundColor Gray
}

# Main command handling
switch ($Command.ToLower()) {
    "get" {
        Get-Version
    }
    "set" {
        if (-not $Value) {
            Write-Error "Version required. Usage: .\version.ps1 set <version>"
            exit 1
        }
        Set-Version $Value
    }
    "bump" {
        if (-not $Value) {
            Write-Error "Part required. Usage: .\version.ps1 bump <major|minor|patch>"
            exit 1
        }
        Invoke-BumpVersion $Value
    }
    "docker" {
        Invoke-DockerBuild
    }
    "release" {
        New-Release
    }
    "help" {
        Show-Help
    }
    default {
        if ($Command -eq "get" -or [string]::IsNullOrEmpty($Command)) {
            $currentVersion = Get-Version
            Write-Host "Current version: $currentVersion" -ForegroundColor Yellow
            Write-Host "Use '.\version.ps1 help' for usage information" -ForegroundColor Gray
        } else {
            Write-Error "Unknown command '$Command'"
            Write-Host "Use '.\version.ps1 help' for usage information" -ForegroundColor Gray
            exit 1
        }
    }
}
