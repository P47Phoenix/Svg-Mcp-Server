#!/bin/bash

# Version Management Script for SVG MCP Server

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
VERSION_FILE="$PROJECT_ROOT/VERSION"

show_help() {
    cat << EOF
Version Management Script for SVG MCP Server

Usage: $0 [command] [options]

Commands:
    get                     Show current version
    set <version>          Set new version (x.y.z format)
    bump <part>            Bump version part (major|minor|patch)
    docker                 Build Docker image with current version
    release                Tag and build release

Examples:
    $0 get                 # Shows: 1.0.0
    $0 set 1.2.3          # Sets version to 1.2.3
    $0 bump patch         # 1.0.0 -> 1.0.1
    $0 bump minor         # 1.0.1 -> 1.1.0
    $0 bump major         # 1.1.0 -> 2.0.0
    $0 docker             # Build Docker image with current version
    $0 release            # Tag git repo and build Docker image

EOF
}

get_version() {
    if [[ -f "$VERSION_FILE" ]]; then
        cat "$VERSION_FILE" | tr -d '[:space:]'
    else
        echo "ERROR: VERSION file not found"
        exit 1
    fi
}

set_version() {
    local new_version="$1"
    
    if [[ ! $new_version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "ERROR: Version must be in x.y.z format (semantic versioning)"
        exit 1
    fi
    
    echo "$new_version" > "$VERSION_FILE"
    echo "✅ Version set to: $new_version"
    
    # Update package.json if it exists
    if [[ -f "$PROJECT_ROOT/package.json" ]]; then
        if command -v jq >/dev/null 2>&1; then
            jq --arg version "$new_version" '.version = $version' "$PROJECT_ROOT/package.json" > "$PROJECT_ROOT/package.json.tmp"
            mv "$PROJECT_ROOT/package.json.tmp" "$PROJECT_ROOT/package.json"
            echo "✅ Updated package.json version"
        else
            echo "⚠️  jq not found, skipping package.json update"
        fi
    fi
}

bump_version() {
    local part="$1"
    local current_version=$(get_version)
    
    IFS='.' read -r major minor patch <<< "$current_version"
    
    case "$part" in
        major)
            major=$((major + 1))
            minor=0
            patch=0
            ;;
        minor)
            minor=$((minor + 1))
            patch=0
            ;;
        patch)
            patch=$((patch + 1))
            ;;
        *)
            echo "ERROR: Invalid part '$part'. Use: major, minor, or patch"
            exit 1
            ;;
    esac
    
    local new_version="$major.$minor.$patch"
    set_version "$new_version"
    echo "📈 Bumped $part: $current_version -> $new_version"
}

build_docker() {
    local build_script="$SCRIPT_DIR/build-docker.sh"
    
    if [[ -f "$build_script" ]]; then
        echo "🐳 Building Docker image..."
        bash "$build_script"
    else
        echo "ERROR: Docker build script not found at $build_script"
        exit 1
    fi
}

create_release() {
    local version=$(get_version)
    
    echo "🚀 Creating release for version $version"
    
    # Check if git repo
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        echo "ERROR: Not a git repository"
        exit 1
    fi
    
    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo "ERROR: Uncommitted changes found. Please commit or stash them first."
        exit 1
    fi
    
    # Create git tag
    if git tag -a "v$version" -m "Release version $version"; then
        echo "✅ Created git tag: v$version"
    else
        echo "ERROR: Failed to create git tag"
        exit 1
    fi
    
    # Build Docker image
    build_docker
    
    echo "🎉 Release $version completed!"
    echo "   Git tag: v$version"
    echo "   Docker image: svg-mcp-server:$version"
}

# Main command handling
case "${1:-}" in
    get)
        get_version
        ;;
    set)
        if [[ -z "${2:-}" ]]; then
            echo "ERROR: Version required. Usage: $0 set <version>"
            exit 1
        fi
        set_version "$2"
        ;;
    bump)
        if [[ -z "${2:-}" ]]; then
            echo "ERROR: Part required. Usage: $0 bump <major|minor|patch>"
            exit 1
        fi
        bump_version "$2"
        ;;
    docker)
        build_docker
        ;;
    release)
        create_release
        ;;
    help|--help|-h)
        show_help
        ;;
    "")
        echo "Current version: $(get_version)"
        echo "Use '$0 help' for usage information"
        ;;
    *)
        echo "ERROR: Unknown command '$1'"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac
