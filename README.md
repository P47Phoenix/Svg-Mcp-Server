# SVG MCP Server

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./VERSION)
[![Docker](https://img.shields.io/badge/docker-ready-green.svg)](./docker/Dockerfile)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

An RFC 7996 compliant SVG diagram server built with the Model Context Protocol (MCP) for creating technical diagrams, flowcharts, and network topology visualizations.

## Features

- **RFC 7996 Compliant**: Full support for SVG requirements in RFC documents
- **Model Context Protocol**: Native MCP integration for AI assistant workflows
- **Comprehensive Diagram Types**: Support for flowcharts, network diagrams, architectural diagrams, and more
- **Production Ready**: Docker containerization with multi-stage builds and security hardening
- **Version Management**: Semantic versioning with automated Docker builds
- **Cross-Platform**: Support for Windows, macOS, and Linux development environments

## Quick Start

### Using Docker (Recommended)

```bash
# Pull and run the latest version
docker run -p 3000:3000 svg-mcp-server:latest

# Or build from source
./scripts/build-docker.sh
docker run -p 3000:3000 svg-mcp-server:1.0.0
```

### From Source

```bash
# Clone the repository
git clone https://github.com/P47Phoenix/svg-mcp-server.git
cd svg-mcp-server

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Start the server
npm start
```

### MCP Configuration for GitHub Copilot

To use this server with GitHub Copilot or other MCP-compatible AI assistants, add the following configuration:

#### Option 1: Using Node.js directly
```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "node",
      "args": ["path/to/svg-mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

#### Option 2: Using Docker
```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "docker",
      "args": [
        "run", 
        "--rm", 
        "-i", 
        "--network=host",
        "svg-mcp-server:1.0.0"
      ]
    }
  }
}
```

#### Option 3: Using npx (if published to npm)
```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "npx",
      "args": ["svg-mcp-server"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

Place this configuration in your MCP client's configuration file (typically `mcp-config.json` or similar).

## Version Management

This project uses semantic versioning with automated Docker builds:

```bash
# Check current version
./scripts/version.sh get

# Bump version and build Docker image
./scripts/version.sh bump patch
./scripts/version.sh docker

# Create a release
./scripts/version.sh release
```

For detailed version management documentation, see [VERSION_MANAGEMENT.md](./docs/VERSION_MANAGEMENT.md).

## Documentation

- [API Reference](./docs/API.md) - Complete API documentation
- [MCP Integration Guide](./docs/MCP_INTEGRATION.md) - Detailed MCP client configuration
- [Configuration Guide](./docs/CONFIGURATION.md) - Server configuration options
- [Docker Guide](./docs/DOCKER.md) - Docker deployment and configuration
- [Version Management](./docs/VERSION_MANAGEMENT.md) - Version control and release workflow
- [Development Guide](./docs/DEVELOPMENT.md) - Development setup and guidelines

## Architecture

The SVG MCP Server is built with:
- **TypeScript**: Type-safe development with modern ES features
- **FastMCP SDK**: High-performance Model Context Protocol implementation
- **Alpine Linux**: Minimal, secure Docker base image
- **GitHub Actions**: Automated CI/CD pipeline with security scanning

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Bump the version: `./scripts/version.sh bump patch`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📚 [Documentation](./docs/)
- 🐛 [Issue Tracker](https://github.com/P47Phoenix/svg-mcp-server/issues)
- 💬 [Discussions](https://github.com/P47Phoenix/svg-mcp-server/discussions)
- 🔧 [MCP Configuration Guide](./docs/MCP_INTEGRATION.md) - Detailed integration instructions

## Usage Examples

Once configured with your MCP client, you can use natural language to create SVG diagrams:

```
"Create a flowchart showing the user authentication process"
"Generate a network topology diagram with 3 servers and 2 routers"
"Design an architectural diagram for a microservices system"
```

The server provides tools for:
- **Template-based SVG generation**: Pre-built templates for common diagram types
- **Dynamic SVG creation**: Custom diagrams based on specifications
- **RFC 7996 compliance**: Standards-compliant SVG output for technical documentation
- **Variable substitution**: Parameterized templates for reusable diagrams

## Version History

Current version: **1.0.0**

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history and release notes.