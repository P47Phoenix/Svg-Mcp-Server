/**
 * SVG MCP Server Implementation
 *
 * This is the main server class that extends FastMCP to provide
 * SVG generation capabilities through the Model Context Protocol.
 */
import { FastMCP } from 'fastmcp';
export interface SvgMcpServerConfig {
    name: string;
    version: string;
    description?: string;
    maxSvgSize?: number;
    enableDebug?: boolean;
}
export declare class SvgMcpServer extends FastMCP {
    private svgRenderer;
    private documentProcessor;
    private templateEngine;
    private templateFactory;
    private config;
    constructor(config: SvgMcpServerConfig);
    private setupTools;
    private setupResources;
    /**
     * Calculate bounding box for a shape element
     */
    private calculateShapeBoundingBox;
    start(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=SvgMcpServer.d.ts.map