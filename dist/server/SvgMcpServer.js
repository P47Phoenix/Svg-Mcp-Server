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
import { SvgDocumentProcessor } from '../core/SvgDocumentProcessor.js';
import { SvgValidationError } from '../types/svg.js';
export class SvgMcpServer extends FastMCP {
    svgRenderer;
    documentProcessor;
    config;
    constructor(config) {
        super({
            name: config.name,
            version: config.version,
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
    setupTools() {
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
                    const spec = {
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
                        throw new SvgValidationError(`Generated SVG exceeds maximum size limit of ${this.config.maxSvgSize} characters`, [`SVG size: ${result.svg.length}, limit: ${this.config.maxSvgSize}`]);
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
                }
                catch (error) {
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
                    const spec = {
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
                }
                catch (error) {
                    logger.error('SVG document validation failed', error);
                    throw error;
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
    }
    setupResources() {
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
    async start() {
        logger.info('Starting SVG MCP Server', {
            name: this.config.name,
            version: this.config.version,
        });
        await super.start();
        logger.info('SVG MCP Server started successfully');
    }
    async stop() {
        logger.info('Stopping SVG MCP Server');
        // Cleanup logic would go here
        logger.info('SVG MCP Server stopped');
    }
}
//# sourceMappingURL=SvgMcpServer.js.map