#!/bin/bash

# Docker Build Script for SVG MCP Server
# Reads version from VERSION file and builds Docker image

set -e

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Read version from VERSION file
if [[ -f "$PROJECT_ROOT/VERSION" ]]; then
    VERSION=$(cat "$PROJECT_ROOT/VERSION" | tr -d '[:space:]')
    echo "Building SVG MCP Server version: $VERSION"
else
    echo "ERROR: VERSION file not found at $PROJECT_ROOT/VERSION"
    exit 1
fi

# Validate version format (semantic versioning)
if [[ ! $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "WARNING: Version '$VERSION' doesn't follow semantic versioning (x.y.z)"
fi

# Build Docker image
echo "Building Docker image: svg-mcp-server:$VERSION"

docker build \
    --build-arg VERSION="$VERSION" \
    --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
    --build-arg VCS_REF="$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')" \
    -t "svg-mcp-server:$VERSION" \
    -t "svg-mcp-server:latest" \
    -f "$SCRIPT_DIR/Dockerfile" \
    "$PROJECT_ROOT"

echo "✅ Successfully built Docker image: svg-mcp-server:$VERSION"
echo "📦 Image also tagged as: svg-mcp-server:latest"

# Show image info
echo ""
echo "📋 Image Information:"
docker images svg-mcp-server:$VERSION --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}"

# Optional: Run container for testing
echo ""
read -p "🚀 Would you like to test the container? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Testing container..."
    docker run --rm svg-mcp-server:$VERSION node -e "console.log('SVG MCP Server $VERSION is working!')"
    echo "✅ Container test passed!"
fi
