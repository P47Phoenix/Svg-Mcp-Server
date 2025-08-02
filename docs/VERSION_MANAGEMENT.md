# SVG MCP Server - Version Management and Docker Build Guide

## Version Management System

This project uses a centralized version management system with semantic versioning (x.y.z format).

### Version File

The `VERSION` file in the project root contains the current version:
```
1.0.0
```

### Version Management Scripts

#### Bash Script (Linux/macOS/WSL)
```bash
# Show current version
./scripts/version.sh get

# Set specific version
./scripts/version.sh set 1.2.3

# Bump version parts
./scripts/version.sh bump patch   # 1.0.0 -> 1.0.1
./scripts/version.sh bump minor   # 1.0.1 -> 1.1.0
./scripts/version.sh bump major   # 1.1.0 -> 2.0.0

# Build Docker image with current version
./scripts/version.sh docker

# Create release (git tag + Docker build)
./scripts/version.sh release
```

#### PowerShell Script (Windows)
```powershell
# Show current version
.\scripts\version.ps1 get

# Set specific version
.\scripts\version.ps1 set 1.2.3

# Bump version parts
.\scripts\version.ps1 bump patch
.\scripts\version.ps1 bump minor
.\scripts\version.ps1 bump major

# Build Docker image with current version
.\scripts\version.ps1 docker

# Create release (git tag + Docker build)
.\scripts\version.ps1 release
```

## Docker Build System

### Enhanced Dockerfile Features

The Docker build system supports dynamic versioning with build arguments:

- `VERSION`: Project version (from VERSION file)
- `BUILD_DATE`: Build timestamp (ISO 8601 format)
- `VCS_REF`: Git commit SHA

### Docker Build Scripts

#### Bash Build Script
```bash
# Basic build
./scripts/build-docker.sh

# Build with testing
./scripts/build-docker.sh --test

# Build specific version
./scripts/build-docker.sh --version 1.2.3

# Show help
./scripts/build-docker.sh --help
```

#### PowerShell Build Script
```powershell
# Basic build
.\scripts\build-docker.ps1

# Build with testing
.\scripts\build-docker.ps1 -Test

# Build and push to registry
.\scripts\build-docker.ps1 -Push -Registry "your-registry.com"

# Build specific version
.\scripts\build-docker.ps1 -Version "1.2.3"

# Show help
.\scripts\build-docker.ps1 -Help
```

### Docker Image Labels

Built images include comprehensive OCI-compliant metadata:

```bash
# Inspect image labels
docker inspect svg-mcp-server:latest --format='{{json .Config.Labels}}' | jq

# View specific labels
docker inspect svg-mcp-server:latest --format='{{.Config.Labels.version}}'
docker inspect svg-mcp-server:latest --format='{{.Config.Labels.build_date}}'
docker inspect svg-mcp-server:latest --format='{{.Config.Labels.vcs_ref}}'
```

## Version Workflow Examples

### Development Workflow
```bash
# Start new feature
git checkout -b feature/new-svg-shape

# Make changes...

# Bump version for testing
./scripts/version.sh bump patch

# Build and test Docker image
./scripts/version.sh docker

# Commit changes
git add .
git commit -m "Add new SVG shape generation"

# Merge to main and create release
git checkout main
git merge feature/new-svg-shape
./scripts/version.sh release
```

### Release Workflow
```bash
# Prepare release
./scripts/version.sh bump minor

# Update any documentation with new version

# Commit version bump
git add VERSION package.json
git commit -m "Bump version to $(cat VERSION)"

# Create release (tags repo and builds Docker image)
./scripts/version.sh release

# Push to remote
git push origin main --tags
```

## CI/CD Integration

The GitHub Actions workflow automatically:
- Reads version from VERSION file
- Builds Docker images with proper versioning
- Tags images with both version and 'latest'
- Includes comprehensive metadata

### Environment Variables

The build system provides these environment variables:
- `PROJECT_VERSION`: Current project version
- `BUILD_DATE`: Build timestamp
- `GIT_SHA`: Current git commit SHA

## Docker Image Usage

### Running the Server
```bash
# Run latest version
docker run -p 3000:3000 svg-mcp-server:latest

# Run specific version
docker run -p 3000:3000 svg-mcp-server:1.0.0

# Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production svg-mcp-server:latest
```

### Checking Image Information
```bash
# Show image details
docker run --rm svg-mcp-server:latest node -e "console.log(JSON.stringify(process.env, null, 2))" | grep -E "(VERSION|BUILD|VCS)"

# Show server version
docker run --rm svg-mcp-server:latest npm run version
```

## Troubleshooting

### Common Issues

1. **Permission denied on scripts**:
   ```bash
   chmod +x scripts/*.sh
   ```

2. **Docker daemon not running**:
   ```bash
   # Linux/macOS
   sudo systemctl start docker
   
   # Windows
   # Start Docker Desktop
   ```

3. **Git not configured**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. **PowerShell execution policy**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Version Validation

Always validate version format:
- ✅ `1.0.0` (valid semantic version)
- ✅ `2.1.3` (valid semantic version)
- ❌ `1.0` (missing patch version)
- ❌ `v1.0.0` (no 'v' prefix)
- ❌ `1.0.0-beta` (no pre-release in basic system)

## Integration with Package Managers

The version management system automatically updates:
- `package.json` version field
- Docker image labels
- Git tags (with 'v' prefix)

This ensures consistency across all project artifacts.
