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
    private config;
    constructor(config: SvgMcpServerConfig);
    private setupTools;
    private setupResources;
    private validateSvgDocument;
    start(): Promise<void>;
    stop(): Promise<void>;
}
//# sourceMappingURL=SvgMcpServer.d.ts.map