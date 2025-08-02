/**
 * SVG MCP Server Implementation
 * 
 * This is the main server class that extends FastMCP to provide
 * SVG generation capabilities through the Model Context Protocol.
 */

import { FastMCP } from 'fastmcp';
import { z } from 'zod';
import { logger } from '../utils/logger.js';
import { SvgRenderer } from '../core/SvgRenderer.js';
import { SvgDocumentProcessor, SvgDocumentSpec } from '../core/SvgDocumentProcessor.js';
import { BasicShapeGenerator, ShapeCollections } from '../core/shapes/index.js';
import { SvgValidationError } from '../types/svg.js';
import { 
  ValidationFactory
} from '../core/validation/ValidationFactory.js';

export interface SvgMcpServerConfig {
  name: string;
  version: string;
  description?: string;
  maxSvgSize?: number;
  enableDebug?: boolean;
}

export class SvgMcpServer extends FastMCP {
  private svgRenderer: SvgRenderer;
  private documentProcessor: SvgDocumentProcessor;
  private config: Required<SvgMcpServerConfig>;

  constructor(config: SvgMcpServerConfig) {
    super({
      name: config.name,
      version: config.version as `${number}.${number}.${number}`,
    });

    this.config = {
      ...config,
      description: config.description || 'SVG MCP Server',
      maxSvgSize: config.maxSvgSize || 10000,
      enableDebug: config.enableDebug || false,
    };

    this.svgRenderer = new SvgRenderer();
    this.documentProcessor = new SvgDocumentProcessor();
    
    if (this.config.enableDebug) {
      logger.setLogLevel('debug');
    }

    this.setupTools();
    this.setupResources();
  }

  private setupTools(): void {
    // Tool: Generate SVG
    this.addTool({
      name: 'generate_svg',
      description: 'Generate an SVG document from a specification',
      parameters: z.object({
        document: z.object({
          viewBox: z.object({
            x: z.number(),
            y: z.number(),
            width: z.number().min(0),
            height: z.number().min(0),
          }),
          elements: z.array(z.any()),
          width: z.number().min(0).optional(),
          height: z.number().min(0).optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          style: z.string().optional(),
        }),
        optimize: z.boolean().default(true),
        validate: z.boolean().default(true),
      }),
      execute: async (args) => {
        const { document, optimize = true, validate = true } = args;

        try {
          logger.info('Processing SVG document request', { 
            elementCount: document.elements?.length,
            optimize, 
            validate 
          });

          // Convert to document specification
          const spec: SvgDocumentSpec = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            ...(document.width !== undefined && { width: document.width }),
            ...(document.height !== undefined && { height: document.height }),
            ...(document.title && { title: document.title }),
            ...(document.description && { description: document.description }),
            ...(document.style && { style: document.style }),
            optimize,
            validate,
            generateMetadata: true,
          };

          // Process document using the document processor
          const result = await this.documentProcessor.processDocument(spec);

          // Check size limits
          if (result.svg.length > this.config.maxSvgSize) {
            throw new SvgValidationError(
              `Generated SVG exceeds maximum size limit of ${this.config.maxSvgSize} characters`,
              [`SVG size: ${result.svg.length}, limit: ${this.config.maxSvgSize}`]
            );
          }

          logger.info('SVG document processed successfully', {
            size: result.svg.length,
            elementCount: result.document.elements.length,
            processingTime: result.processingTime,
            warnings: result.warnings.length,
            errors: result.errors.length,
          });

          return {
            content: [{
              type: 'text',
              text: JSON.stringify({
                svg: result.svg,
                document: result.document,
                metadata: result.metadata,
                processing: {
                  time: result.processingTime,
                  warnings: result.warnings,
                  errors: result.errors,
                  generated: new Date().toISOString(),
                },
                stats: {
                  size: result.svg.length,
                  elementCount: result.document.elements.length,
                  complexity: result.metadata.complexity,
                  features: result.metadata.features,
                },
              }, null, 2)
            }]
          };
        } catch (error) {
          logger.error('Failed to generate SVG', error);
          
          if (error instanceof SvgValidationError) {
            throw error;
          }
          
          throw new Error(`SVG generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    });

    // Tool: Validate SVG Document
    this.addTool({
      name: 'validate_svg_document',
      description: 'Validate an SVG document specification',
      parameters: z.object({
        document: z.object({
          viewBox: z.object({
            x: z.number(),
            y: z.number(),
            width: z.number().min(0),
            height: z.number().min(0),
          }),
          elements: z.array(z.any()),
        }),
      }),
      execute: async (args) => {
        const { document } = args;
        try {
          logger.info('Validating SVG document', { 
            elementCount: document.elements?.length 
          });
          
          // Convert to document specification for validation
          const spec: SvgDocumentSpec = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            validate: true,
            generateMetadata: true,
          };

          // Use document processor for comprehensive validation
          const result = await this.documentProcessor.processDocument(spec);
          
          const validationResult = {
            valid: result.errors.length === 0,
            errors: result.errors,
            warnings: result.warnings,
            metadata: result.metadata,
            processingTime: result.processingTime,
            compliance: result.metadata.compliance,
            accessibility: result.metadata.accessibility,
            features: result.metadata.features,
            complexity: result.metadata.complexity,
          };
          
          logger.info('SVG document validation completed', {
            valid: validationResult.valid,
            errors: validationResult.errors.length,
            warnings: validationResult.warnings.length,
          });
          
          return {
            content: [{
              type: 'text',
              text: JSON.stringify(validationResult, null, 2)
            }]
          };
        } catch (error) {
          logger.error('SVG document validation failed', error);
          throw error;
        }
      }
    });

    // Tool: Create Shape
    this.addTool({
      name: 'create_shape',
      description: 'Create individual SVG shapes using the shape generator',
      parameters: z.object({
        type: z.enum(['circle', 'rect', 'line', 'text', 'group', 'path', 'ellipse', 'polygon', 'star']).describe('Type of shape to create'),
        options: z.any().describe('Shape-specific options object'),
        includeDocument: z.boolean().default(false).describe('Whether to wrap the shape in a complete SVG document')
      }),
      execute: async (args) => {
        const { type, options, includeDocument } = args;

        try {
          logger.info('Creating shape', { type, includeDocument });
          
          let shape;
          
          switch (type) {
            case 'circle':
              shape = BasicShapeGenerator.createCircle(options);
              break;
            case 'rect':
              shape = BasicShapeGenerator.createRect(options);
              break;
            case 'line':
              shape = BasicShapeGenerator.createLine(options);
              break;
            case 'text':
              shape = BasicShapeGenerator.createText(options);
              break;
            case 'group':
              shape = BasicShapeGenerator.createGroup(options);
              break;
            case 'path':
              shape = BasicShapeGenerator.createPath(options);
              break;
            case 'ellipse':
              if (!options.cx || !options.cy || !options.rx || !options.ry) {
                throw new Error('Ellipse requires cx, cy, rx, and ry parameters');
              }
              shape = BasicShapeGenerator.createEllipse(options.cx, options.cy, options.rx, options.ry, options);
              break;
            case 'polygon':
              if (!options.points || !Array.isArray(options.points)) {
                throw new Error('Polygon requires points array parameter');
              }
              shape = BasicShapeGenerator.createPolygon(options.points, options);
              break;
            case 'star':
              if (!options.cx || !options.cy || !options.outerRadius || !options.innerRadius || !options.points) {
                throw new Error('Star requires cx, cy, outerRadius, innerRadius, and points parameters');
              }
              shape = BasicShapeGenerator.createStar(options.cx, options.cy, options.outerRadius, options.innerRadius, options.points, options);
              break;
            default:
              throw new Error(`Unknown shape type: ${type}`);
          }

          let result = {
            shape,
            svg: null as string | null,
            document: null as any
          };

          if (includeDocument) {
            // Calculate appropriate viewBox based on shape
            const boundingBox = this.calculateShapeBoundingBox(shape);
            const padding = 10;
            
            const spec: SvgDocumentSpec = {
              viewBox: {
                x: boundingBox.x - padding,
                y: boundingBox.y - padding,
                width: boundingBox.width + 2 * padding,
                height: boundingBox.height + 2 * padding
              },
              elements: [shape],
              title: `${type.charAt(0).toUpperCase() + type.slice(1)} Shape`,
              description: `Generated ${type} shape`
            };

            const processResult = await this.documentProcessor.processDocument(spec);
            result.svg = processResult.svg;
            result.document = processResult.document;
          }

          logger.info('Shape created successfully', { type, shapeType: shape.type });

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }]
          };

        } catch (error) {
          logger.error('Shape creation failed', { error, type, options });
          throw new Error(`Shape creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    });

    // Tool: Create Shape Collection
    this.addTool({
      name: 'create_shape_collection',
      description: 'Create pre-defined collections of shapes for common use cases',
      parameters: z.object({
        collection: z.enum(['geometric', 'flowchart', 'arrows', 'stars', 'ui']).describe('Type of shape collection to create'),
        options: z.any().optional().describe('Optional styling options to apply to all shapes'),
        includeDocument: z.boolean().default(true).describe('Whether to wrap the collection in a complete SVG document')
      }),
      execute: async (args) => {
        const { collection, options, includeDocument } = args;

        try {
          logger.info('Creating shape collection', { collection, includeDocument });
          
          const shapeCollection = ShapeCollections.getCollection(collection, options);
          
          if (!shapeCollection) {
            throw new Error(`Unknown collection type: ${collection}`);
          }

          let result = {
            collection: shapeCollection,
            svg: null as string | null,
            document: null as any
          };

          if (includeDocument) {
            const spec: SvgDocumentSpec = {
              viewBox: {
                x: shapeCollection.boundingBox.x - 10,
                y: shapeCollection.boundingBox.y - 10,
                width: shapeCollection.boundingBox.width + 20,
                height: shapeCollection.boundingBox.height + 20
              },
              elements: shapeCollection.shapes,
              title: shapeCollection.name,
              description: shapeCollection.description
            };

            const processResult = await this.documentProcessor.processDocument(spec);
            result.svg = processResult.svg;
            result.document = processResult.document;
          }

          logger.info('Shape collection created successfully', { 
            collection, 
            shapeCount: shapeCollection.shapes.length 
          });

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }]
          };

        } catch (error) {
          logger.error('Shape collection creation failed', { error, collection, options });
          throw new Error(`Shape collection creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    });

    // Tool: Health Check
    this.addTool({
      name: 'health_check',
      description: 'Check the health and status of the SVG MCP server',
      execute: async () => {
        const health = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          version: this.config.version,
          config: {
            maxSvgSize: this.config.maxSvgSize,
            debugEnabled: this.config.enableDebug,
          },
          renderer: {
            status: 'operational',
            capabilities: this.svgRenderer.getCapabilities(),
          },
          processor: {
            status: 'operational',
            statistics: this.documentProcessor.getProcessingStats(),
          },
        };

        logger.debug('Health check performed', health);
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(health, null, 2)
          }]
        };
      }
    });

    // Tool: Validate SVG Document
    this.addTool({
      name: 'validate_svg',
      description: 'Validate an SVG document with comprehensive checks',
      parameters: z.object({
        document: z.object({
          viewBox: z.object({
            x: z.number(),
            y: z.number(),
            width: z.number().min(0),
            height: z.number().min(0),
          }),
          elements: z.array(z.any()),
          title: z.string().optional(),
          description: z.string().optional(),
        }),
        preset: z.enum(['strict', 'standard', 'minimal', 'performance', 'accessibility']).default('standard'),
        includeRecommendations: z.boolean().default(true),
        includeQuickFixes: z.boolean().default(true),
      }),
      execute: async (args) => {
        const { document, preset, includeRecommendations, includeQuickFixes } = args;

        try {
          logger.info('Validating SVG document', { preset, elementCount: document.elements?.length });

          // Convert document args to proper SvgDocument format
          const svgDocument = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            ...(document.title && { title: document.title }),
            ...(document.description && { description: document.description })
          };

          const validationResult = await ValidationFactory.validateDocument(svgDocument, { preset });

          const response: any = {
            valid: validationResult.overall.valid,
            score: validationResult.overall.score,
            summary: validationResult.overall.summary,
            errors: validationResult.documentResult?.errors || [],
            warnings: validationResult.documentResult?.warnings || [],
          };

          if (includeRecommendations) {
            response.recommendations = validationResult.recommendations;
          }

          if (includeQuickFixes) {
            response.quickFixes = validationResult.quickFixes;
          }

          if (validationResult.documentResult) {
            response.reports = {
              accessibility: validationResult.documentResult.accessibility,
              performance: validationResult.documentResult.performance,
              compliance: validationResult.documentResult.compliance,
              documentStats: validationResult.documentResult.documentStats,
            };
          }

          logger.debug('Validation completed', { 
            valid: response.valid, 
            score: response.score,
            errorCount: response.errors.length,
            warningCount: response.warnings.length 
          });

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(response, null, 2)
            }]
          };
        } catch (error) {
          logger.error('SVG validation failed', { error, document });
          throw error;
        }
      }
    });

    // Tool: Quick Validate SVG
    this.addTool({
      name: 'quick_validate_svg',
      description: 'Quick validation for basic structure and critical errors',
      parameters: z.object({
        document: z.object({
          viewBox: z.object({
            x: z.number(),
            y: z.number(),
            width: z.number().min(0),
            height: z.number().min(0),
          }),
          elements: z.array(z.any()),
        }),
      }),
      execute: async (args) => {
        const { document } = args;

        try {
          const result = ValidationFactory.quickValidate(document);

          logger.debug('Quick validation completed', result);

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }]
          };
        } catch (error) {
          logger.error('Quick validation failed', { error, document });
          throw error;
        }
      }
    });

    // Tool: Validate with Auto-Fix
    this.addTool({
      name: 'validate_and_fix_svg',
      description: 'Validate SVG document and apply automatic fixes where possible',
      parameters: z.object({
        document: z.object({
          viewBox: z.object({
            x: z.number(),
            y: z.number(),
            width: z.number().min(0),
            height: z.number().min(0),
          }),
          elements: z.array(z.any()),
          title: z.string().optional(),
          description: z.string().optional(),
        }),
        preset: z.enum(['strict', 'standard', 'minimal', 'performance', 'accessibility']).default('standard'),
      }),
      execute: async (args) => {
        const { document, preset } = args;

        try {
          logger.info('Validating SVG document with auto-fix', { preset, elementCount: document.elements?.length });

          // Convert document args to proper SvgDocument format
          const svgDocument = {
            viewBox: document.viewBox,
            elements: document.elements || [],
            ...(document.title && { title: document.title }),
            ...(document.description && { description: document.description })
          };

          const result = await ValidationFactory.validateWithAutoFix(svgDocument, preset);

          const response: any = {
            original: {
              valid: result.validationResult.overall.valid,
              score: result.validationResult.overall.score,
              summary: result.validationResult.overall.summary,
            },
            autoFixApplied: !!result.autoFixedDocument,
            appliedFixes: result.appliedFixes,
            fixedDocument: result.autoFixedDocument,
          };

          // If fixes were applied, validate the fixed document
          if (result.autoFixedDocument) {
            const fixedValidation = await ValidationFactory.validateDocument(result.autoFixedDocument, { preset });
            (response as any).fixedValidation = {
              valid: fixedValidation.overall.valid,
              score: fixedValidation.overall.score,
              summary: fixedValidation.overall.summary,
            };
          }

          logger.debug('Validation with auto-fix completed', { 
            fixesApplied: result.appliedFixes.length,
            originalScore: response.original.score,
            fixedScore: (response as any).fixedValidation?.score 
          });

          return {
            content: [{
              type: 'text',
              text: JSON.stringify(response, null, 2)
            }]
          };
        } catch (error) {
          logger.error('SVG validation with auto-fix failed', { error, document });
          throw error;
        }
      }
    });
  }

  private setupResources(): void {
    // Resource: Server Information
    this.addResource({
      uri: 'server://info',
      name: 'Server Information',
      description: 'Information about the SVG MCP server',
      mimeType: 'application/json',
      load: async () => {
        const info = {
          name: this.config.name,
          version: this.config.version,
          description: this.config.description,
          capabilities: {
            svgGeneration: true,
            documentProcessing: true,
            validation: true,
            optimization: true,
            accessibility: true,
            rfc7996Compliance: true,
            metadataGeneration: true,
            transforms: ['scale', 'translate', 'normalize', 'accessibility'],
          },
          limits: {
            maxSvgSize: this.config.maxSvgSize,
          },
          supportedElements: this.svgRenderer.getSupportedElements(),
          processor: {
            statistics: this.documentProcessor.getProcessingStats(),
            features: [
              'document_validation',
              'element_relationship_analysis',
              'compliance_checking',
              'optimization',
              'metadata_generation',
              'accessibility_enhancement',
            ],
          },
        };

        logger.debug('Server info requested', info);
        return {
          text: JSON.stringify(info, null, 2),
          mimeType: 'application/json',
          uri: 'server://info'
        };
      }
    });

    // Resource: SVG Schema
    this.addResource({
      uri: 'schema://svg-document',
      name: 'SVG Document Schema',
      description: 'JSON schema for SVG document structure',
      mimeType: 'application/json',
      load: async () => {
        const schema = {
          $schema: 'http://json-schema.org/draft-07/schema#',
          title: 'SVG Document',
          description: 'Schema for SVG document specification',
          type: 'object',
          required: ['viewBox', 'elements'],
          properties: {
            viewBox: {
              type: 'object',
              required: ['x', 'y', 'width', 'height'],
              properties: {
                x: { type: 'number' },
                y: { type: 'number' },
                width: { type: 'number', minimum: 0 },
                height: { type: 'number', minimum: 0 },
              },
            },
            elements: {
              type: 'array',
              items: { $ref: '#/definitions/SvgElement' },
            },
            // Additional properties would be defined here
          },
          definitions: {
            SvgElement: {
              oneOf: [
                { $ref: '#/definitions/CircleElement' },
                { $ref: '#/definitions/RectElement' },
                { $ref: '#/definitions/LineElement' },
                { $ref: '#/definitions/PathElement' },
                { $ref: '#/definitions/TextElement' },
                { $ref: '#/definitions/GroupElement' },
              ],
            },
            // Element definitions would be expanded here
          },
        };

        return {
          text: JSON.stringify(schema, null, 2),
          mimeType: 'application/json',
          uri: 'schema://svg-document'
        };
      }
    });
  }

  /**
   * Calculate bounding box for a shape element
   */
  private calculateShapeBoundingBox(shape: any): { x: number; y: number; width: number; height: number } {
    switch (shape.type) {
      case 'circle':
        return {
          x: shape.cx - shape.r,
          y: shape.cy - shape.r,
          width: shape.r * 2,
          height: shape.r * 2
        };
      case 'rect':
        return {
          x: shape.x,
          y: shape.y,
          width: shape.width,
          height: shape.height
        };
      case 'line':
        return {
          x: Math.min(shape.x1, shape.x2),
          y: Math.min(shape.y1, shape.y2),
          width: Math.abs(shape.x2 - shape.x1),
          height: Math.abs(shape.y2 - shape.y1)
        };
      case 'text':
        // Estimate text bounding box
        const fontSize = shape['font-size'] || 16;
        const textLength = shape.content.length;
        return {
          x: shape.x,
          y: shape.y - fontSize,
          width: textLength * fontSize * 0.6, // Rough estimate
          height: fontSize
        };
      default:
        // Default bounding box for unknown shapes
        return { x: 0, y: 0, width: 100, height: 100 };
    }
  }

  async start(): Promise<void> {
    logger.info('Starting SVG MCP Server', {
      name: this.config.name,
      version: this.config.version,
    });

    await super.start();
    
    logger.info('SVG MCP Server started successfully');
  }

  async stop(): Promise<void> {
    logger.info('Stopping SVG MCP Server');
    // Cleanup logic would go here
    logger.info('SVG MCP Server stopped');
  }
}
