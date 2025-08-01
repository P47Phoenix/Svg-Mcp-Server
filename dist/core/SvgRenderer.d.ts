/**
 * Core SVG Rendering Engine
 *
 * This class handles the actual SVG generation and rendering logic.
 */
import { SvgDocument } from '../types/svg.js';
export interface RenderOptions {
    optimize?: boolean;
    validate?: boolean;
    indent?: boolean;
    minify?: boolean;
}
export declare class SvgRenderer {
    private readonly supportedElements;
    getSupportedElements(): string[];
    getCapabilities(): Record<string, boolean>;
    render(document: SvgDocument, options?: RenderOptions): Promise<string>;
    private renderDocument;
    private renderElement;
    private renderCircle;
    private renderRect;
    private renderLine;
    private renderPath;
    private renderText;
    private renderGroup;
    private buildCommonAttributes;
    private buildStyleString;
    private optimizeSvg;
    private escapeXml;
    private escapeAttribute;
}
//# sourceMappingURL=SvgRenderer.d.ts.map