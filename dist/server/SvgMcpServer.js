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
import { ViewBoxSchema, SvgValidationError } from '../types/svg.js';
export class SvgMcpServer extends FastMCP {
    svgRenderer;
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
                    logger.debug('Generating SVG document', { document, optimize, validate });
                    // Validate document if requested
                    if (validate) {
                        await this.validateSvgDocument(document);
                    }
                    // Generate SVG
                    const svg = await this.svgRenderer.render(document, {
                        optimize,
                        validate,
                    });
                    // Check size limits
                    if (svg.length > this.config.maxSvgSize) {
                        throw new SvgValidationError(`Generated SVG exceeds maximum size limit of ${this.config.maxSvgSize} characters`);
                    }
                    logger.info('SVG generated successfully', {
                        size: svg.length,
                        elementCount: document.elements.length,
                    });
                    return {
                        content: [{
                                type: 'text',
                                text: JSON.stringify({
                                    svg,
                                    size: svg.length,
                                    elementCount: document.elements.length,
                                    metadata: {
                                        generated: new Date().toISOString(),
                                        optimized: optimize,
                                        validated: validate,
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
                    logger.debug('Validating SVG document', { document });
                    const validationResult = await this.validateSvgDocument(document);
                    logger.info('SVG document validation completed', validationResult);
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
                        validation: true,
                        optimization: true,
                        rfc7996Compliance: true,
                    },
                    limits: {
                        maxSvgSize: this.config.maxSvgSize,
                    },
                    supportedElements: this.svgRenderer.getSupportedElements(),
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
    async validateSvgDocument(document) {
        const errors = [];
        const warnings = [];
        try {
            // Validate viewBox
            ViewBoxSchema.parse(document.viewBox);
            if (document.viewBox.width <= 0 || document.viewBox.height <= 0) {
                errors.push('ViewBox must have positive width and height');
            }
            // Validate elements exist
            if (!document.elements || document.elements.length === 0) {
                warnings.push('Document contains no elements');
            }
            // Validate element structure (basic validation)
            document.elements.forEach((element, index) => {
                if (!element.type) {
                    errors.push(`Element at index ${index} is missing type property`);
                }
            });
            // Check for potential performance issues
            if (document.elements.length > 1000) {
                warnings.push('Document contains a large number of elements, which may impact performance');
            }
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                errors.push(...error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
            }
            else {
                errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }
        const valid = errors.length === 0;
        if (!valid) {
            throw new SvgValidationError('SVG document validation failed', { errors, warnings });
        }
        return { valid, errors, warnings };
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