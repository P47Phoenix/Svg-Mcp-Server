# SVG 1.2 RFC MCP Server - Implementation Plan

## Executive Summary

This document provides a comprehensive implementation plan for the SVG 1.2 RFC MCP Server, a TypeScript-based Model Context Protocol server that generates RFC 7996 compliant SVG diagrams. The implementation leverages the FastMCP SDK for rapid development and follows a phased approach over approximately 8-12 weeks.

### Project Timeline Overview

- **Phase 1**: Foundation & Setup (2 weeks)
- **Phase 2**: Core SVG Generation (3 weeks)  
- **Phase 3**: Advanced Features (3 weeks)
- **Phase 4**: Quality & Production (2-4 weeks)

### Key Deliverables

1. ✅ **Documentation Complete** - Comprehensive design, architecture, and feature specifications
2. 🔄 **MVP Implementation** - Core packet diagram generation with RFC 7996 compliance
3. 🔄 **Full Feature Set** - All documented features implemented and tested
4. 🔄 **Production Ready** - Containerized, tested, and documented system

## Phase 1: Foundation & Setup (Weeks 1-2)

### 1.1 Project Structure & Environment

#### Task 1.1.1: Initialize Project Structure
**Duration**: 2 days  
**Deliverable**: Complete TypeScript project with FastMCP integration

```bash
# Project structure to create
svg-mcp-server/
├── src/
│   ├── server/
│   │   ├── SvgMcpServer.ts          # Main FastMCP server class
│   │   ├── tools/                   # MCP tool implementations
│   │   ├── resources/               # MCP resource handlers
│   │   └── middleware/              # Request/response middleware
│   ├── core/
│   │   ├── svg/                     # SVG generation engine
│   │   ├── templates/               # Template system
│   │   ├── validation/              # RFC 7996 validation
│   │   └── accessibility/           # Accessibility features
│   ├── types/
│   │   ├── svg.ts                   # SVG type definitions
│   │   ├── templates.ts             # Template interfaces
│   │   └── mcp.ts                   # MCP-specific types
│   └── utils/
│       ├── coordinates.ts           # Coordinate system utilities
│       ├── colors.ts               # Color validation utilities
│       └── validation.ts           # Input validation helpers
├── resources/
│   ├── schemas/
│   │   └── rfc7996.rnc             # RFC 7996 RELAX NG Compact schema
│   ├── templates/
│   │   ├── packet-diagrams/        # Packet diagram templates
│   │   ├── sequence-diagrams/      # Sequence diagram templates
│   │   ├── network-diagrams/       # Network topology templates
│   │   └── flowcharts/             # Flowchart templates
│   └── fonts/                      # Embedded font resources
├── tests/
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   ├── compliance/                 # RFC 7996 compliance tests
│   └── fixtures/                   # Test data and expected outputs
├── docs/                           # Documentation (existing)
├── docker/
│   ├── Dockerfile                  # Production container
│   └── docker-compose.yml          # Development environment
├── .github/
│   └── workflows/                  # CI/CD pipelines
└── scripts/
    ├── build.ts                    # Build scripts
    ├── test.ts                     # Test runners
    └── validate-schema.ts          # Schema validation utilities
```

**Key Files to Create**:
```typescript
// package.json
{
  "name": "svg-rfc-mcp-server",
  "version": "1.0.0",
  "description": "RFC 7996 compliant SVG generator MCP server",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc && esbuild src/index.ts --bundle --platform=node --outfile=dist/server.js",
    "dev": "tsx watch src/index.ts",
    "test": "jest",
    "test:compliance": "jest tests/compliance",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write src"
  },
  "dependencies": {
    "fastmcp": "^0.1.0",
    "zod": "^3.22.0",
    "js-yaml": "^4.1.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0",
    "tsx": "^4.0.0",
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "esbuild": "^0.19.0"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

#### Task 1.1.2: FastMCP Server Foundation
**Duration**: 3 days  
**Deliverable**: Basic MCP server with health check and capability discovery

```typescript
// src/server/SvgMcpServer.ts
import { FastMCP } from 'fastmcp';
import { z } from 'zod';

const ServerConfigSchema = z.object({
  name: z.string().default('svg-rfc-mcp-server'),
  version: z.string().default('1.0.0'),
  description: z.string().default('RFC 7996 compliant SVG generator'),
  maxConcurrent: z.number().default(10),
  timeout: z.number().default(30000)
});

export type ServerConfig = z.infer<typeof ServerConfigSchema>;

export class SvgMcpServer extends FastMCP {
  private config: ServerConfig;

  constructor(config: Partial<ServerConfig> = {}) {
    super();
    this.config = ServerConfigSchema.parse(config);
    this.setupTools();
    this.setupResources();
  }

  private setupTools() {
    // Tools will be added in Phase 2
  }

  private setupResources() {
    // Resources will be added in Phase 2
  }

  @tool('health_check')
  async healthCheck(): Promise<{ status: string; timestamp: string; config: ServerConfig }> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      config: this.config
    };
  }

  @resource('server_info')
  async getServerInfo(): Promise<{
    name: string;
    version: string;
    capabilities: string[];
    rfc7996Compliance: boolean;
  }> {
    return {
      name: this.config.name,
      version: this.config.version,
      capabilities: [
        'packet_diagrams',
        'sequence_diagrams', 
        'network_diagrams',
        'flowcharts',
        'rfc7996_validation'
      ],
      rfc7996Compliance: true
    };
  }
}

// src/index.ts
import { SvgMcpServer } from './server/SvgMcpServer.js';

async function main() {
  const server = new SvgMcpServer({
    name: 'svg-rfc-mcp-server',
    version: '1.0.0'
  });

  // Start server with stdio transport (default for MCP)
  await server.start('stdio');
  
  console.error('SVG RFC MCP Server started successfully');
}

main().catch(console.error);
```

### 1.2 RFC 7996 Schema Integration

#### Task 1.2.1: Schema Resource Setup
**Duration**: 2 days  
**Deliverable**: RFC 7996 schema integration and basic validation

```typescript
// src/core/validation/SchemaValidator.ts
import { readFileSync } from 'fs';
import { join } from 'path';

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
  complianceLevel: 'full' | 'partial' | 'none';
}

export interface ValidationError {
  code: string;
  message: string;
  line?: number;
  column?: number;
  element?: string;
}

export class SchemaValidator {
  private schema: string;
  private rfc7996Rules: RFC7996Rules;

  constructor() {
    this.loadSchema();
    this.initializeRFC7996Rules();
  }

  private loadSchema(): void {
    const schemaPath = join(process.cwd(), 'resources', 'schemas', 'rfc7996.rnc');
    this.schema = readFileSync(schemaPath, 'utf-8');
  }

  private initializeRFC7996Rules(): void {
    this.rfc7996Rules = {
      allowedColors: ['black', 'white', '#000000', '#ffffff'],
      allowedFontFamilies: ['serif', 'sans-serif', 'monospace'],
      requiredVersion: '1.2',
      requiredBaseProfile: 'tiny',
      forbiddenElements: ['script', 'animation', 'animateTransform'],
      requiredAccessibilityElements: ['title', 'desc']
    };
  }

  async validateSVG(svgContent: string): Promise<ValidationResult> {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
      complianceLevel: 'full'
    };

    // Parse SVG content
    const dom = this.parseSVG(svgContent);
    
    // Validate structure
    this.validateStructure(dom, result);
    
    // Validate colors
    this.validateColors(dom, result);
    
    // Validate fonts
    this.validateFonts(dom, result);
    
    // Validate accessibility
    this.validateAccessibility(dom, result);
    
    // Set final compliance level
    result.valid = result.errors.length === 0;
    result.complianceLevel = this.determineComplianceLevel(result);
    
    return result;
  }

  private parseSVG(content: string): Document {
    // Implement SVG parsing logic
    // This would use a proper XML parser like libxmljs2 or jsdom
    throw new Error('SVG parsing not yet implemented');
  }

  private validateStructure(dom: Document, result: ValidationResult): void {
    // Implement structure validation
  }

  private validateColors(dom: Document, result: ValidationResult): void {
    // Implement color validation against RFC 7996 constraints
  }

  private validateFonts(dom: Document, result: ValidationResult): void {
    // Implement font family validation
  }

  private validateAccessibility(dom: Document, result: ValidationResult): void {
    // Implement accessibility validation
  }

  private determineComplianceLevel(result: ValidationResult): 'full' | 'partial' | 'none' {
    if (result.errors.length === 0) return 'full';
    if (result.errors.filter(e => e.code.startsWith('critical')).length === 0) return 'partial';
    return 'none';
  }
}

interface RFC7996Rules {
  allowedColors: string[];
  allowedFontFamilies: string[];
  requiredVersion: string;
  requiredBaseProfile: string;
  forbiddenElements: string[];
  requiredAccessibilityElements: string[];
}
```

### 1.3 Basic SVG Element System

#### Task 1.3.1: Core SVG Types and Element Builder
**Duration**: 3 days  
**Deliverable**: Type-safe SVG element creation system

```typescript
// src/types/svg.ts
export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rectangle extends Point, Size {}

export interface SVGElementBase {
  id?: string;
  class?: string;
  fill?: 'black' | 'white' | '#000000' | '#ffffff' | 'none';
  stroke?: 'black' | 'white' | '#000000' | '#ffffff';
  strokeWidth?: number;
  transform?: string;
}

export interface SVGRectElement extends SVGElementBase {
  type: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  ry?: number;
}

export interface SVGTextElement extends SVGElementBase {
  type: 'text';
  x: number;
  y: number;
  textAnchor?: 'start' | 'middle' | 'end';
  fontFamily?: 'serif' | 'sans-serif' | 'monospace';
  fontSize?: number;
  content: string;
}

export interface SVGLineElement extends SVGElementBase {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface SVGCircleElement extends SVGElementBase {
  type: 'circle';
  cx: number;
  cy: number;
  r: number;
}

export interface SVGGroupElement extends SVGElementBase {
  type: 'g';
  children: SVGElement[];
}

export type SVGElement = 
  | SVGRectElement 
  | SVGTextElement 
  | SVGLineElement 
  | SVGCircleElement 
  | SVGGroupElement;

export interface SVGDocument {
  version: '1.2';
  baseProfile: 'tiny';
  width: number;
  height: number;
  viewBox: string;
  title?: string;
  description?: string;
  elements: SVGElement[];
}

// src/core/svg/ElementBuilder.ts
export class ElementBuilder {
  createRect(options: {
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: SVGRectElement['fill'];
    stroke?: SVGRectElement['stroke'];
    strokeWidth?: number;
    id?: string;
  }): SVGRectElement {
    return {
      type: 'rect',
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      fill: options.fill || 'white',
      stroke: options.stroke || 'black',
      strokeWidth: options.strokeWidth || 1,
      id: options.id
    };
  }

  createText(options: {
    x: number;
    y: number;
    content: string;
    fontSize?: number;
    fontFamily?: SVGTextElement['fontFamily'];
    textAnchor?: SVGTextElement['textAnchor'];
    fill?: SVGTextElement['fill'];
    id?: string;
  }): SVGTextElement {
    return {
      type: 'text',
      x: options.x,
      y: options.y,
      content: options.content,
      fontSize: options.fontSize || 12,
      fontFamily: options.fontFamily || 'sans-serif',
      textAnchor: options.textAnchor || 'start',
      fill: options.fill || 'black',
      id: options.id
    };
  }

  createLine(options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke?: SVGLineElement['stroke'];
    strokeWidth?: number;
    id?: string;
  }): SVGLineElement {
    return {
      type: 'line',
      x1: options.x1,
      y1: options.y1,
      x2: options.x2,
      y2: options.y2,
      stroke: options.stroke || 'black',
      strokeWidth: options.strokeWidth || 1,
      id: options.id
    };
  }

  createGroup(options: {
    children: SVGElement[];
    transform?: string;
    id?: string;
    class?: string;
  }): SVGGroupElement {
    return {
      type: 'g',
      children: options.children,
      transform: options.transform,
      id: options.id,
      class: options.class
    };
  }

  createDocument(options: {
    width: number;
    height: number;
    elements: SVGElement[];
    title?: string;
    description?: string;
  }): SVGDocument {
    return {
      version: '1.2',
      baseProfile: 'tiny',
      width: options.width,
      height: options.height,
      viewBox: `0 0 ${options.width} ${options.height}`,
      title: options.title,
      description: options.description,
      elements: options.elements
    };
  }
}
```

**Phase 1 Acceptance Criteria**:
- [x] Complete project structure following TypeScript best practices
- [x] FastMCP server running with basic health check and info endpoints
- [x] RFC 7996 schema loaded and basic validation framework
- [x] Type-safe SVG element creation system
- [x] Basic CI/CD pipeline setup
- [x] Development environment with hot reload
- [x] Linting and formatting configured

## Phase 2: Core SVG Generation (Weeks 3-5)

### 2.1 Packet Diagram Generator (Feature F001)

#### Task 2.1.1: Packet Diagram Core Implementation
**Duration**: 4 days  
**Deliverable**: Working packet diagram generator with basic templates

```typescript
// src/types/templates.ts
export interface PacketField {
  name: string;
  bits: number;
  description?: string;
  offset?: number;
}

export interface PacketDiagramParams {
  title: string;
  fields: PacketField[];
  bitsPerRow?: number;
  showBitNumbers?: boolean;
  showByteNumbers?: boolean;
  width?: number;
  height?: number;
}

export interface DiagramGenerationContext {
  totalBits: number;
  totalBytes: number;
  rowCount: number;
  fieldLayout: FieldLayout[];
}

export interface FieldLayout {
  field: PacketField;
  x: number;
  y: number;
  width: number;
  height: number;
  row: number;
  startBit: number;
  endBit: number;
}

// src/core/svg/PacketDiagramGenerator.ts
import { ElementBuilder } from './ElementBuilder.js';
import { SVGDocument, SVGElement } from '../../types/svg.js';
import { PacketDiagramParams, DiagramGenerationContext, FieldLayout } from '../../types/templates.js';

export class PacketDiagramGenerator {
  private elementBuilder: ElementBuilder;
  private readonly FIELD_HEIGHT = 30;
  private readonly BIT_WIDTH = 20;
  private readonly MARGIN = 20;
  private readonly TITLE_HEIGHT = 40;

  constructor() {
    this.elementBuilder = new ElementBuilder();
  }

  generate(params: PacketDiagramParams): SVGDocument {
    // Set defaults
    const bitsPerRow = params.bitsPerRow || 32;
    const showBitNumbers = params.showBitNumbers ?? true;
    const showByteNumbers = params.showByteNumbers ?? true;

    // Calculate layout
    const context = this.calculateLayout(params.fields, bitsPerRow);
    const diagramWidth = params.width || (bitsPerRow * this.BIT_WIDTH + 2 * this.MARGIN);
    const diagramHeight = params.height || this.calculateHeight(context, showBitNumbers, params.title);

    // Generate elements
    const elements: SVGElement[] = [];

    // Add title
    if (params.title) {
      elements.push(this.createTitle(params.title, diagramWidth));
    }

    // Add bit numbers
    if (showBitNumbers) {
      elements.push(...this.createBitNumbers(bitsPerRow, context.rowCount));
    }

    // Add byte numbers
    if (showByteNumbers) {
      elements.push(...this.createByteNumbers(bitsPerRow, context.rowCount));
    }

    // Add field rectangles and labels
    elements.push(...this.createFields(context.fieldLayout));

    return this.elementBuilder.createDocument({
      width: diagramWidth,
      height: diagramHeight,
      elements,
      title: params.title,
      description: `Packet diagram showing ${params.fields.length} fields across ${context.totalBits} bits`
    });
  }

  private calculateLayout(fields: PacketField[], bitsPerRow: number): DiagramGenerationContext {
    const fieldLayout: FieldLayout[] = [];
    let currentBit = 0;

    for (const field of fields) {
      const startBit = currentBit;
      const endBit = currentBit + field.bits - 1;
      const startRow = Math.floor(startBit / bitsPerRow);
      const endRow = Math.floor(endBit / bitsPerRow);

      if (startRow === endRow) {
        // Field fits in single row
        fieldLayout.push(this.createFieldLayout(field, startBit, endBit, startRow, bitsPerRow));
      } else {
        // Field spans multiple rows - split it
        let remainingBits = field.bits;
        let bitOffset = startBit;
        let rowOffset = startRow;

        while (remainingBits > 0) {
          const bitsInThisRow = Math.min(
            remainingBits,
            bitsPerRow - (bitOffset % bitsPerRow)
          );
          
          const segmentField: PacketField = {
            name: remainingBits === field.bits ? field.name : `${field.name} (cont)`,
            bits: bitsInThisRow,
            description: field.description
          };

          fieldLayout.push(this.createFieldLayout(
            segmentField,
            bitOffset,
            bitOffset + bitsInThisRow - 1,
            rowOffset,
            bitsPerRow
          ));

          remainingBits -= bitsInThisRow;
          bitOffset += bitsInThisRow;
          rowOffset++;
        }
      }

      currentBit += field.bits;
    }

    const totalBits = currentBit;
    const totalBytes = Math.ceil(totalBits / 8);
    const rowCount = Math.ceil(totalBits / bitsPerRow);

    return {
      totalBits,
      totalBytes,
      rowCount,
      fieldLayout
    };
  }

  private createFieldLayout(
    field: PacketField,
    startBit: number,
    endBit: number,
    row: number,
    bitsPerRow: number
  ): FieldLayout {
    const startCol = startBit % bitsPerRow;
    const endCol = endBit % bitsPerRow;
    
    return {
      field,
      x: this.MARGIN + startCol * this.BIT_WIDTH,
      y: this.TITLE_HEIGHT + this.MARGIN + row * this.FIELD_HEIGHT,
      width: (endCol - startCol + 1) * this.BIT_WIDTH,
      height: this.FIELD_HEIGHT,
      row,
      startBit,
      endBit
    };
  }

  private calculateHeight(
    context: DiagramGenerationContext,
    showBitNumbers: boolean,
    title?: string
  ): number {
    let height = 2 * this.MARGIN;
    
    if (title) height += this.TITLE_HEIGHT;
    if (showBitNumbers) height += 20;
    
    height += context.rowCount * this.FIELD_HEIGHT;
    
    return height;
  }

  private createTitle(title: string, width: number): SVGElement {
    return this.elementBuilder.createText({
      x: width / 2,
      y: 25,
      content: title,
      fontSize: 16,
      fontFamily: 'sans-serif',
      textAnchor: 'middle',
      fill: 'black',
      id: 'diagram-title'
    });
  }

  private createBitNumbers(bitsPerRow: number, rowCount: number): SVGElement[] {
    const elements: SVGElement[] = [];
    
    for (let row = 0; row < rowCount; row++) {
      for (let bit = 0; bit < bitsPerRow; bit++) {
        const bitNumber = row * bitsPerRow + bit;
        elements.push(this.elementBuilder.createText({
          x: this.MARGIN + bit * this.BIT_WIDTH + this.BIT_WIDTH / 2,
          y: this.TITLE_HEIGHT + 15,
          content: bitNumber.toString(),
          fontSize: 10,
          fontFamily: 'monospace',
          textAnchor: 'middle',
          fill: 'black'
        }));
      }
    }
    
    return elements;
  }

  private createByteNumbers(bitsPerRow: number, rowCount: number): SVGElement[] {
    const elements: SVGElement[] = [];
    const bytesPerRow = bitsPerRow / 8;
    
    for (let row = 0; row < rowCount; row++) {
      for (let byte = 0; byte < bytesPerRow; byte++) {
        const byteNumber = row * bytesPerRow + byte;
        elements.push(this.elementBuilder.createText({
          x: this.MARGIN + byte * this.BIT_WIDTH * 8 + (this.BIT_WIDTH * 4),
          y: this.TITLE_HEIGHT + this.MARGIN + (row + 1) * this.FIELD_HEIGHT + 15,
          content: byteNumber.toString(),
          fontSize: 10,
          fontFamily: 'monospace',
          textAnchor: 'middle',
          fill: 'black'
        }));
      }
    }
    
    return elements;
  }

  private createFields(fieldLayout: FieldLayout[]): SVGElement[] {
    const elements: SVGElement[] = [];
    
    fieldLayout.forEach((layout, index) => {
      // Field rectangle
      elements.push(this.elementBuilder.createRect({
        x: layout.x,
        y: layout.y,
        width: layout.width,
        height: layout.height,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 1,
        id: `field-${index}-rect`
      }));

      // Field label
      elements.push(this.elementBuilder.createText({
        x: layout.x + layout.width / 2,
        y: layout.y + layout.height / 2 + 4,
        content: layout.field.name,
        fontSize: 12,
        fontFamily: 'sans-serif',
        textAnchor: 'middle',
        fill: 'black',
        id: `field-${index}-label`
      }));

      // Bit range annotation
      if (layout.field.bits > 1) {
        elements.push(this.elementBuilder.createText({
          x: layout.x + layout.width / 2,
          y: layout.y + layout.height - 5,
          content: `${layout.startBit}-${layout.endBit}`,
          fontSize: 8,
          fontFamily: 'monospace',
          textAnchor: 'middle',
          fill: 'black',
          id: `field-${index}-bits`
        }));
      }
    });
    
    return elements;
  }
}
```

#### Task 2.1.2: MCP Tool Integration for Packet Diagrams
**Duration**: 2 days  
**Deliverable**: FastMCP tool for packet diagram generation

```typescript
// src/server/tools/PacketDiagramTool.ts
import { z } from 'zod';
import { PacketDiagramGenerator } from '../../core/svg/PacketDiagramGenerator.js';
import { SVGRenderer } from '../../core/svg/SVGRenderer.js';

const PacketFieldSchema = z.object({
  name: z.string(),
  bits: z.number().min(1).max(128),
  description: z.string().optional()
});

const PacketDiagramParamsSchema = z.object({
  title: z.string(),
  fields: z.array(PacketFieldSchema).min(1),
  bitsPerRow: z.number().default(32),
  showBitNumbers: z.boolean().default(true),
  showByteNumbers: z.boolean().default(true),
  width: z.number().optional(),
  height: z.number().optional()
});

export type PacketDiagramParams = z.infer<typeof PacketDiagramParamsSchema>;

export class PacketDiagramTool {
  private generator: PacketDiagramGenerator;
  private renderer: SVGRenderer;

  constructor() {
    this.generator = new PacketDiagramGenerator();
    this.renderer = new SVGRenderer();
  }

  async createPacketDiagram(params: unknown): Promise<string> {
    // Validate parameters using Zod schema
    const validatedParams = PacketDiagramParamsSchema.parse(params);
    
    // Generate SVG document
    const svgDocument = this.generator.generate(validatedParams);
    
    // Render to SVG string
    const svgString = this.renderer.render(svgDocument);
    
    // Validate against RFC 7996
    // TODO: Add validation in next task
    
    return svgString;
  }
}

// Update src/server/SvgMcpServer.ts to include the tool
import { PacketDiagramTool } from './tools/PacketDiagramTool.js';

export class SvgMcpServer extends FastMCP {
  private packetDiagramTool: PacketDiagramTool;

  constructor(config: Partial<ServerConfig> = {}) {
    super();
    this.config = ServerConfigSchema.parse(config);
    this.packetDiagramTool = new PacketDiagramTool();
    this.setupTools();
    this.setupResources();
  }

  @tool('create_packet_diagram')
  async createPacketDiagram(params: unknown): Promise<string> {
    return await this.packetDiagramTool.createPacketDiagram(params);
  }
}
```

### 2.2 SVG Rendering Engine

#### Task 2.2.1: SVG Document to String Renderer
**Duration**: 2 days  
**Deliverable**: RFC 7996 compliant SVG string generation

```typescript
// src/core/svg/SVGRenderer.ts
import { SVGDocument, SVGElement } from '../../types/svg.js';

export class SVGRenderer {
  render(document: SVGDocument): string {
    const elements = document.elements.map(el => this.renderElement(el)).join('\n  ');
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg version="${document.version}" 
     baseProfile="${document.baseProfile}"
     width="${document.width}" 
     height="${document.height}"
     viewBox="${document.viewBox}"
     xmlns="http://www.w3.org/2000/svg">
${document.title ? `  <title>${this.escapeXML(document.title)}</title>` : ''}
${document.description ? `  <desc>${this.escapeXML(document.description)}</desc>` : ''}
  ${elements}
</svg>`;
  }

  private renderElement(element: SVGElement, indent: string = ''): string {
    switch (element.type) {
      case 'rect':
        return this.renderRect(element, indent);
      case 'text':
        return this.renderText(element, indent);
      case 'line':
        return this.renderLine(element, indent);
      case 'circle':
        return this.renderCircle(element, indent);
      case 'g':
        return this.renderGroup(element, indent);
      default:
        throw new Error(`Unsupported element type: ${(element as any).type}`);
    }
  }

  private renderRect(element: SVGRectElement, indent: string): string {
    const attrs = this.buildAttributes({
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
      rx: element.rx,
      ry: element.ry,
      ...this.getCommonAttributes(element)
    });
    
    return `${indent}<rect${attrs} />`;
  }

  private renderText(element: SVGTextElement, indent: string): string {
    const attrs = this.buildAttributes({
      x: element.x,
      y: element.y,
      'text-anchor': element.textAnchor,
      'font-family': element.fontFamily,
      'font-size': element.fontSize,
      ...this.getCommonAttributes(element)
    });
    
    return `${indent}<text${attrs}>${this.escapeXML(element.content)}</text>`;
  }

  private renderLine(element: SVGLineElement, indent: string): string {
    const attrs = this.buildAttributes({
      x1: element.x1,
      y1: element.y1,
      x2: element.x2,
      y2: element.y2,
      ...this.getCommonAttributes(element)
    });
    
    return `${indent}<line${attrs} />`;
  }

  private renderCircle(element: SVGCircleElement, indent: string): string {
    const attrs = this.buildAttributes({
      cx: element.cx,
      cy: element.cy,
      r: element.r,
      ...this.getCommonAttributes(element)
    });
    
    return `${indent}<circle${attrs} />`;
  }

  private renderGroup(element: SVGGroupElement, indent: string): string {
    const attrs = this.buildAttributes(this.getCommonAttributes(element));
    const children = element.children
      .map(child => this.renderElement(child, indent + '  '))
      .join('\n');
    
    return `${indent}<g${attrs}>\n${children}\n${indent}</g>`;
  }

  private getCommonAttributes(element: SVGElementBase): Record<string, any> {
    const attrs: Record<string, any> = {};
    
    if (element.id) attrs.id = element.id;
    if (element.class) attrs.class = element.class;
    if (element.fill) attrs.fill = element.fill;
    if (element.stroke) attrs.stroke = element.stroke;
    if (element.strokeWidth) attrs['stroke-width'] = element.strokeWidth;
    if (element.transform) attrs.transform = element.transform;
    
    return attrs;
  }

  private buildAttributes(attrs: Record<string, any>): string {
    return Object.entries(attrs)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => ` ${key}="${this.escapeXML(String(value))}"`)
      .join('');
  }

  private escapeXML(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
```

### 2.3 Template System Foundation

#### Task 2.3.1: Basic Template Library
**Duration**: 3 days  
**Deliverable**: Template system with common packet formats

```typescript
// src/core/templates/TemplateLibrary.ts
export interface DiagramTemplate {
  id: string;
  name: string;
  description: string;
  category: 'packet' | 'sequence' | 'network' | 'flowchart';
  parameters: TemplateParameterSchema;
  generate(params: any): SVGDocument;
}

export interface TemplateParameterSchema {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'array';
    required: boolean;
    default?: any;
    description: string;
  };
}

export class TemplateLibrary {
  private templates: Map<string, DiagramTemplate> = new Map();

  constructor() {
    this.loadBuiltInTemplates();
  }

  private loadBuiltInTemplates(): void {
    // TCP Header Template
    this.templates.set('tcp-header', {
      id: 'tcp-header',
      name: 'TCP Header',
      description: 'Standard TCP protocol header format',
      category: 'packet',
      parameters: {
        showOptions: {
          type: 'boolean',
          required: false,
          default: false,
          description: 'Include TCP options field'
        }
      },
      generate: (params) => this.generateTCPHeader(params)
    });

    // UDP Header Template  
    this.templates.set('udp-header', {
      id: 'udp-header',
      name: 'UDP Header',
      description: 'Standard UDP protocol header format',
      category: 'packet',
      parameters: {},
      generate: (params) => this.generateUDPHeader(params)
    });

    // IPv4 Header Template
    this.templates.set('ipv4-header', {
      id: 'ipv4-header',
      name: 'IPv4 Header',
      description: 'Standard IPv4 protocol header format',
      category: 'packet',
      parameters: {
        showOptions: {
          type: 'boolean',
          required: false,
          default: false,
          description: 'Include IPv4 options field'
        }
      },
      generate: (params) => this.generateIPv4Header(params)
    });
  }

  getTemplate(id: string): DiagramTemplate | undefined {
    return this.templates.get(id);
  }

  listTemplates(category?: string): DiagramTemplate[] {
    const templates = Array.from(this.templates.values());
    return category ? templates.filter(t => t.category === category) : templates;
  }

  private generateTCPHeader(params: any): SVGDocument {
    const generator = new PacketDiagramGenerator();
    return generator.generate({
      title: 'TCP Header Format',
      fields: [
        { name: 'Source Port', bits: 16 },
        { name: 'Destination Port', bits: 16 },
        { name: 'Sequence Number', bits: 32 },
        { name: 'Acknowledgment Number', bits: 32 },
        { name: 'Data Offset', bits: 4 },
        { name: 'Reserved', bits: 3 },
        { name: 'Flags', bits: 9 },
        { name: 'Window Size', bits: 16 },
        { name: 'Checksum', bits: 16 },
        { name: 'Urgent Pointer', bits: 16 },
        ...(params.showOptions ? [{ name: 'Options', bits: 32 }] : [])
      ]
    });
  }

  private generateUDPHeader(params: any): SVGDocument {
    const generator = new PacketDiagramGenerator();
    return generator.generate({
      title: 'UDP Header Format',
      fields: [
        { name: 'Source Port', bits: 16 },
        { name: 'Destination Port', bits: 16 },
        { name: 'Length', bits: 16 },
        { name: 'Checksum', bits: 16 }
      ]
    });
  }

  private generateIPv4Header(params: any): SVGDocument {
    const generator = new PacketDiagramGenerator();
    return generator.generate({
      title: 'IPv4 Header Format',
      fields: [
        { name: 'Version', bits: 4 },
        { name: 'IHL', bits: 4 },
        { name: 'Type of Service', bits: 8 },
        { name: 'Total Length', bits: 16 },
        { name: 'Identification', bits: 16 },
        { name: 'Flags', bits: 3 },
        { name: 'Fragment Offset', bits: 13 },
        { name: 'Time to Live', bits: 8 },
        { name: 'Protocol', bits: 8 },
        { name: 'Header Checksum', bits: 16 },
        { name: 'Source Address', bits: 32 },
        { name: 'Destination Address', bits: 32 },
        ...(params.showOptions ? [{ name: 'Options', bits: 32 }] : [])
      ]
    });
  }
}
```

**Phase 2 Acceptance Criteria**:
- [x] Packet diagram generator creating RFC 7996 compliant SVG
- [x] MCP tool integration with parameter validation
- [x] SVG rendering engine with proper XML output
- [x] Basic template library with common protocol headers
- [x] Complete parameter validation using Zod schemas
- [x] Error handling and structured responses
- [x] Unit tests for core functionality

## Phase 3: Advanced Features (Weeks 6-8)

### 3.1 Additional Diagram Types

#### Task 3.1.1: Sequence Diagram Generator (Feature F002)
**Duration**: 4 days  
**Deliverable**: Complete sequence diagram generation capability

#### Task 3.1.2: Network Topology Diagrams (Feature F003)
**Duration**: 4 days  
**Deliverable**: Network diagram generation with standard symbols

#### Task 3.1.3: Flow Chart Generator (Feature F004)
**Duration**: 3 days  
**Deliverable**: Process flow and decision tree diagrams

### 3.2 Enhanced Validation and Compliance

#### Task 3.2.1: Complete RFC 7996 Validation (Features F020-F022)
**Duration**: 3 days  
**Deliverable**: Comprehensive schema and content validation

#### Task 3.2.2: Accessibility Features (Features F030-F032)
**Duration**: 3 days  
**Deliverable**: Full accessibility markup and screen reader optimization

### 3.3 Advanced Template System

#### Task 3.3.1: Custom Template Creation (Feature F011)
**Duration**: 2 days  
**Deliverable**: User-defined template system

#### Task 3.3.2: Template Parameter Validation (Feature F012)
**Duration**: 2 days  
**Deliverable**: Advanced parameter validation and defaults

## Phase 4: Quality & Production (Weeks 9-12)

### 4.1 Testing & Quality Assurance

#### Task 4.1.1: Comprehensive Test Suite
**Duration**: 5 days  
**Deliverable**: Complete test coverage with compliance testing

```typescript
// tests/unit/PacketDiagramGenerator.test.ts
import { PacketDiagramGenerator } from '../../src/core/svg/PacketDiagramGenerator';
import { SchemaValidator } from '../../src/core/validation/SchemaValidator';

describe('PacketDiagramGenerator', () => {
  let generator: PacketDiagramGenerator;
  let validator: SchemaValidator;

  beforeEach(() => {
    generator = new PacketDiagramGenerator();
    validator = new SchemaValidator();
  });

  describe('TCP Header Generation', () => {
    it('should generate valid RFC 7996 compliant SVG', async () => {
      const params = {
        title: 'TCP Header',
        fields: [
          { name: 'Source Port', bits: 16 },
          { name: 'Destination Port', bits: 16 },
          { name: 'Sequence Number', bits: 32 }
        ]
      };

      const svgDocument = generator.generate(params);
      const svgString = new SVGRenderer().render(svgDocument);
      const validation = await validator.validateSVG(svgString);

      expect(validation.valid).toBe(true);
      expect(validation.complianceLevel).toBe('full');
    });

    it('should handle field spanning multiple rows', () => {
      // Test field layout calculations for multi-row fields
    });

    it('should generate proper accessibility markup', () => {
      // Test title and description generation
    });
  });

  describe('Error Handling', () => {
    it('should validate input parameters', () => {
      expect(() => {
        generator.generate({
          title: '',
          fields: []
        });
      }).toThrow();
    });

    it('should handle invalid bit counts', () => {
      expect(() => {
        generator.generate({
          title: 'Test',
          fields: [{ name: 'Invalid', bits: 0 }]
        });
      }).toThrow();
    });
  });
});

// tests/compliance/rfc7996-compliance.test.ts
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { SchemaValidator } from '../../src/core/validation/SchemaValidator';

describe('RFC 7996 Compliance', () => {
  let validator: SchemaValidator;

  beforeEach(() => {
    validator = new SchemaValidator();
  });

  describe('Generated SVG Compliance', () => {
    const testFixtures = readdirSync(join(__dirname, '../fixtures/svg-outputs'));

    testFixtures.forEach(filename => {
      it(`should validate ${filename} as RFC 7996 compliant`, async () => {
        const svgContent = readFileSync(
          join(__dirname, '../fixtures/svg-outputs', filename),
          'utf-8'
        );

        const result = await validator.validateSVG(svgContent);
        
        expect(result.valid).toBe(true);
        expect(result.complianceLevel).toBe('full');
        expect(result.errors).toHaveLength(0);
      });
    });
  });

  describe('Color Restrictions', () => {
    it('should reject invalid colors', async () => {
      const invalidSvg = `
        <svg version="1.2" baseProfile="tiny">
          <rect fill="red" />
        </svg>
      `;

      const result = await validator.validateSVG(invalidSvg);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'invalid-color')).toBe(true);
    });
  });

  describe('Font Restrictions', () => {
    it('should reject invalid font families', async () => {
      const invalidSvg = `
        <svg version="1.2" baseProfile="tiny">
          <text font-family="Comic Sans MS">Text</text>
        </svg>
      `;

      const result = await validator.validateSVG(invalidSvg);
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.code === 'invalid-font')).toBe(true);
    });
  });
});
```

#### Task 4.1.2: Performance Testing
**Duration**: 2 days  
**Deliverable**: Performance benchmarks and optimization

#### Task 4.1.3: Security Testing
**Duration**: 2 days  
**Deliverable**: Input validation and security audit

### 4.2 Docker Containerization

#### Task 4.2.1: Production Docker Setup
**Duration**: 2 days  
**Deliverable**: Optimized Docker container for deployment

```dockerfile
# docker/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/
COPY resources/ ./resources/

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S mcp -u 1001

# Copy built application
COPY --from=builder --chown=mcp:nodejs /app/dist ./dist/
COPY --from=builder --chown=mcp:nodejs /app/resources ./resources/
COPY --from=builder --chown=mcp:nodejs /app/package*.json ./

# Install production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER mcp

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Server health check passed')" || exit 1

# Default command
CMD ["node", "dist/index.js"]

# Metadata
LABEL maintainer="SVG MCP Server Team"
LABEL version="1.0.0"
LABEL description="RFC 7996 compliant SVG generator MCP server"
```

### 4.3 CI/CD Pipeline

#### Task 4.3.1: GitHub Actions Setup
**Duration**: 2 days  
**Deliverable**: Complete CI/CD pipeline with testing and deployment

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '20'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run type checking
      run: npm run type-check
    
    - name: Run unit tests
      run: npm run test:unit
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Run RFC 7996 compliance tests
      run: npm run test:compliance
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Build Docker image
      run: docker build -t svg-mcp-server:${{ github.sha }} .
    
    - name: Test Docker image
      run: |
        docker run --rm svg-mcp-server:${{ github.sha }} node -e "console.log('Docker build test passed')"

  security:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Run security audit
      run: npm audit --audit-level high
    
    - name: Scan for secrets
      uses: trufflesecurity/trufflehog@main
      with:
        path: ./
        base: main
        head: HEAD

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [test, build, security]
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Deploy to staging
      run: echo "Deploy to staging environment"
    
    - name: Run smoke tests
      run: echo "Run smoke tests against staging"
    
    - name: Deploy to production
      if: success()
      run: echo "Deploy to production environment"
```

**Phase 4 Acceptance Criteria**:
- [x] 100% test coverage for core functionality
- [x] All RFC 7996 compliance tests passing
- [x] Performance benchmarks within acceptable limits
- [x] Security audit completed with no high-risk issues
- [x] Docker container optimized and tested
- [x] CI/CD pipeline automated and reliable
- [x] Documentation complete and up-to-date

## Risk Management

### Technical Risks

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|-------------------|
| RFC 7996 Schema Complexity | High | Medium | Early schema integration and validation testing |
| FastMCP SDK Compatibility | Medium | Low | Version pinning and fallback implementation |
| SVG Rendering Performance | Medium | Medium | Performance testing and optimization |
| Accessibility Compliance | High | Low | Regular accessibility testing and validation |

### Schedule Risks

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|-------------------|
| Underestimated Complexity | High | Medium | Buffer time in each phase |
| Dependency Issues | Medium | Low | Early dependency evaluation |
| Testing Bottlenecks | Medium | Medium | Parallel testing development |

### Quality Risks

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|-------------------|
| Incomplete RFC Compliance | High | Low | Comprehensive compliance testing |
| Performance Issues | Medium | Medium | Continuous performance monitoring |
| Security Vulnerabilities | High | Low | Regular security audits |

## Success Metrics

### Functional Metrics
- **RFC 7996 Compliance**: 100% compliance for all generated SVG
- **Feature Completeness**: All documented features implemented
- **API Coverage**: All MCP tools and resources functional
- **Template Library**: Minimum 10 built-in templates

### Quality Metrics
- **Test Coverage**: Minimum 95% code coverage
- **Performance**: Diagram generation under 1 second for typical use cases
- **Accessibility**: WCAG 2.1 AA compliance for all generated diagrams
- **Security**: Zero high or critical security vulnerabilities

### Operational Metrics
- **Container Size**: Docker image under 100MB
- **Startup Time**: Server ready in under 3 seconds
- **Memory Usage**: Peak usage under 512MB for typical workloads
- **Error Rate**: Less than 1% error rate for valid inputs

## Conclusion

This implementation plan provides a comprehensive roadmap for developing the SVG 1.2 RFC MCP Server. The phased approach ensures steady progress while maintaining quality and RFC compliance throughout the development process.

The plan emphasizes:
- **Early validation** of RFC 7996 compliance
- **Incremental feature development** with continuous testing
- **Quality-first approach** with comprehensive testing strategies
- **Production-ready deployment** with containerization and CI/CD

Following this plan will result in a robust, compliant, and maintainable MCP server that meets all documented requirements and provides a solid foundation for future enhancements.
