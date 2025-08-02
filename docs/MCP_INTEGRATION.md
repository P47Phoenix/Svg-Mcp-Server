# MCP Integration Guide - SVG MCP Server

This guide provides detailed instructions for integrating the SVG MCP Server with various Model Context Protocol (MCP) compatible clients and AI assistants.

## Overview

The SVG MCP Server implements the Model Context Protocol to provide AI assistants with the ability to generate RFC 7996 compliant SVG diagrams. It offers tools for template-based diagram creation, dynamic SVG generation, and advanced diagram customization.

## Supported MCP Clients

- GitHub Copilot (with MCP support)
- Claude Desktop
- Custom MCP implementations
- Any MCP-compatible AI assistant

## Configuration Options

### Option 1: Direct Node.js Execution

Best for: Development environments, direct server access

```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "node",
      "args": ["path/to/svg-mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info",
        "MCP_TRANSPORT": "stdio"
      }
    }
  }
}
```

### Option 2: Docker Container

Best for: Production environments, isolated execution

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
      ],
      "env": {
        "DOCKER_HOST": "unix:///var/run/docker.sock"
      }
    }
  }
}
```

### Option 3: NPM Package (Future)

Best for: Easy installation and updates

```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "npx",
      "args": ["@p47phoenix/svg-mcp-server"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Option 4: Global Installation

Best for: System-wide availability

```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "svg-mcp-server",
      "args": ["--stdio"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Environment Variables

Configure the server behavior using these environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `development` | Runtime environment (`production`, `development`, `test`) |
| `LOG_LEVEL` | `info` | Logging level (`debug`, `info`, `warn`, `error`) |
| `MCP_TRANSPORT` | `stdio` | MCP transport protocol |
| `SVG_TEMPLATE_PATH` | `./resources/templates` | Path to SVG templates directory |
| `SVG_OUTPUT_PATH` | `./output` | Default output directory for generated SVGs |
| `MAX_SVG_SIZE` | `10MB` | Maximum size limit for generated SVG files |

## Client-Specific Configuration

### GitHub Copilot Configuration

For GitHub Copilot users, add the configuration to your MCP settings:

```json
{
  "version": "1.0",
  "mcpServers": {
    "svg-diagrams": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "svg-mcp-server:1.0.0"
      ],
      "description": "RFC 7996 compliant SVG diagram generation"
    }
  }
}
```

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "node",
      "args": ["/path/to/svg-mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Available Tools

Once configured, the server provides these MCP tools:

### Core SVG Generation
- `generate_svg`: Create custom SVG diagrams from specifications
- `validate_svg`: Validate SVG compliance with RFC 7996
- `optimize_svg`: Optimize SVG files for size and performance

### Template Management
- `list_templates`: Browse available SVG templates
- `get_template`: Retrieve template details and variables
- `instantiate_template`: Create SVG from template with custom values
- `search_templates`: Find templates by criteria

### Diagram Types
- `create_flowchart`: Generate flowcharts and process diagrams
- `create_network_diagram`: Design network topology visualizations
- `create_architecture_diagram`: Build system architecture diagrams
- `create_organizational_chart`: Generate organizational structure diagrams

## Usage Examples

### Basic SVG Generation

```
User: "Create a simple flowchart showing a login process"

Assistant will use: generate_svg tool with flowchart specifications
Output: RFC 7996 compliant SVG file
```

### Template-based Creation

```
User: "Use the network template to show 3 servers connected to a router"

Assistant will use: 
1. search_templates (category: "network")
2. instantiate_template (with server count: 3)
Output: Customized network diagram SVG
```

### Complex Architectural Diagram

```
User: "Design a microservices architecture with API gateway, 4 services, and database"

Assistant will use: create_architecture_diagram tool
Output: Professional architectural diagram
```

## Troubleshooting

### Common Issues

1. **Server not starting**
   - Check Node.js version (requires 18+)
   - Verify all dependencies are installed
   - Check port availability (default: 3000)

2. **Docker connection issues**
   - Ensure Docker daemon is running
   - Verify image is built: `docker images svg-mcp-server`
   - Check container logs: `docker logs <container-id>`

3. **MCP communication errors**
   - Verify stdio transport is configured
   - Check environment variables
   - Enable debug logging: `LOG_LEVEL=debug`

4. **SVG generation failures**
   - Validate input parameters
   - Check template availability
   - Verify sufficient memory/disk space

### Debug Mode

Enable detailed logging for troubleshooting:

```json
{
  "mcpServers": {
    "svg-mcp-server": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "NODE_ENV": "development",
        "LOG_LEVEL": "debug",
        "DEBUG": "svg-mcp-server:*"
      }
    }
  }
}
```

### Performance Optimization

For high-volume usage:

1. **Use Docker with resource limits**:
   ```bash
   docker run --memory=512m --cpus=1.0 svg-mcp-server:1.0.0
   ```

2. **Enable caching**:
   ```json
   {
     "env": {
       "ENABLE_CACHE": "true",
       "CACHE_TTL": "3600"
     }
   }
   ```

3. **Optimize template loading**:
   ```json
   {
     "env": {
       "PRELOAD_TEMPLATES": "true",
       "TEMPLATE_CACHE_SIZE": "100"
     }
   }
   ```

## Security Considerations

### Production Deployment

1. **Run as non-root user** (Docker automatically configures this)
2. **Limit resource usage** with Docker constraints
3. **Use read-only filesystem** where possible
4. **Network isolation** with Docker networks
5. **Regular security updates** of base images

### Input Validation

The server automatically validates:
- SVG structure and syntax
- Template variable types
- File size limits
- Path traversal attempts
- Malicious content patterns

## API Reference

For complete API documentation, see:
- [API.md](./API.md) - Complete tool and parameter reference
- [TEMPLATES.md](./TEMPLATES.md) - Available templates and usage
- [EXAMPLES.md](./EXAMPLES.md) - Common usage patterns and examples

## Support

If you encounter issues with MCP integration:

1. Check the [troubleshooting guide](#troubleshooting) above
2. Review server logs with debug mode enabled
3. Consult the [main documentation](../README.md)
4. Open an issue on [GitHub Issues](https://github.com/P47Phoenix/svg-mcp-server/issues)
5. Join the discussion on [GitHub Discussions](https://github.com/P47Phoenix/svg-mcp-server/discussions)
