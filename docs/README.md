# SVG 1.2 RFC MCP Server - Documentation Index

This repository contains the complete documentation for the SVG 1.2 RFC MCP Server, a Model Context Protocol server that generates SVG diagrams compliant with RFC 7996 specifications.

## Documentation Structure

### Core Documentation

- **[Design Document](design.md)** - High-level design philosophy, objectives, and principles
- **[Architecture Document](architecture.md)** - Detailed system architecture and component design
- **[Features Document](features.md)** - Comprehensive feature list with specifications

## Project Overview

The SVG 1.2 RFC MCP Server enables AI assistants and other MCP clients to generate technical diagrams that comply with the strict requirements of RFC 7996 (SVG 1.2 RFC profile). This specialized SVG profile is designed for use in RFC documents and similar technical publications.

### Key Characteristics

- **RFC 7996 Compliant**: Strict adherence to the SVG 1.2 RFC specification
- **Monochrome Only**: Black and white graphics suitable for technical documentation
- **Accessibility First**: Built-in support for screen readers and assistive technology
- **Template-Based**: Pre-built templates for common technical diagram types
- **Validation-Focused**: Automatic validation against official RFC schema

## Quick Reference

### Target Diagram Types

1. **Packet Layout Diagrams** - Network protocol packet structures
2. **Sequence Diagrams** - Message flow and interaction patterns
3. **Network Topology Diagrams** - System architecture and connections
4. **Flow Charts** - Process flows and decision trees
5. **Basic Technical Illustrations** - Simple geometric diagrams

### RFC 7996 Constraints

The SVG 1.2 RFC profile enforces several important constraints:

- **No Color**: Only black (`#000000`) and white (`#ffffff`) colors allowed
- **No Animation**: Static diagrams only, no scripting or interactivity
- **Limited Fonts**: Only `serif`, `sans-serif`, and `monospace` generic families
- **No External Resources**: Self-contained SVG without external dependencies
- **Accessibility Required**: Must include `title`, `desc`, and `role` attributes

### Common Use Cases

- **RFC Documentation**: Creating diagrams for Internet Engineering Task Force documents
- **Technical Specifications**: Illustrating protocol structures and system designs
- **Academic Papers**: Technical diagrams for research publications
- **Standards Documents**: Compliant illustrations for standards organizations
- **Accessibility-First Documentation**: Diagrams that work well with assistive technology

## Implementation Status

This documentation describes the implementation of the SVG 1.2 RFC MCP Server using **TypeScript** and the **FastMCP SDK**. The implementation follows the architectural patterns and feature specifications outlined in these documents.

### Technology Stack

- **Language**: TypeScript/Node.js
- **MCP Framework**: FastMCP SDK
- **Runtime**: Node.js with Docker containerization
- **Dependencies**: Self-contained with bundled resources

### Development Phases

1. **Phase 1**: Core SVG generation with basic templates using FastMCP
2. **Phase 2**: Advanced features and optimization
3. **Phase 3**: AI-powered enhancements and collaboration features

## Related Standards and Specifications

- **[RFC 7996](https://datatracker.ietf.org/doc/html/rfc7996)** - SVG Drawings for RFCs: SVG 1.2 RFC
- **[SVG 1.2 Tiny](https://www.w3.org/TR/SVGTiny12/)** - Base SVG specification
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - Protocol for AI-tool communication
- **[FastMCP SDK](https://github.com/jlowin/fastmcp)** - TypeScript SDK for rapid MCP server development
- **[WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)** - Web Content Accessibility Guidelines

## Contributing

This documentation serves as the specification for implementing the SVG 1.2 RFC MCP Server. The design prioritizes:

- **Compliance**: Strict adherence to RFC 7996 specifications
- **Accessibility**: Universal design principles for inclusive access
- **Simplicity**: Clear, focused functionality without unnecessary complexity
- **Quality**: Professional output suitable for formal technical documentation

For questions about the specification or implementation details, refer to the detailed documentation in each section.
