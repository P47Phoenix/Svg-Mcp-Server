/**
 * Core SVG Rendering Engine
 * 
 * This class handles the actual SVG generation and rendering logic.
 */

import { SvgDocument, SvgAnyElement, SvgStyle, TextStyle, SvgRenderError } from '../types/svg.js';
import { logger } from '../utils/logger.js';

export interface RenderOptions {
  optimize?: boolean;
  validate?: boolean;
  indent?: boolean;
  minify?: boolean;
}

export class SvgRenderer {
  private readonly supportedElements = [
    'circle',
    'rect', 
    'line',
    'path',
    'text',
    'group'
  ];

  getSupportedElements(): string[] {
    return [...this.supportedElements];
  }

  getCapabilities(): Record<string, boolean> {
    return {
      basicShapes: true,
      paths: true,
      text: true,
      groups: true,
      styling: true,
      transforms: true,
      optimization: true,
    };
  }

  async render(document: SvgDocument, options: RenderOptions = {}): Promise<string> {
    const {
      optimize = true,
      indent = false,
      minify = false
    } = options;

    try {
      logger.debug('Starting SVG rendering', { document, options });

      // Build SVG content
      let svg = this.renderDocument(document, { indent, minify });

      // Apply optimizations if requested
      if (optimize) {
        svg = this.optimizeSvg(svg);
      }

      logger.debug('SVG rendering completed', { 
        size: svg.length,
        optimized: optimize 
      });

      return svg;
    } catch (error) {
      logger.error('SVG rendering failed', error);
      throw new SvgRenderError(
        `Failed to render SVG: ${error instanceof Error ? error.message : 'Unknown error'}`,
        document.elements[0]
      );
    }
  }

  private renderDocument(document: SvgDocument, options: { indent: boolean; minify: boolean }): string {
    const { indent, minify } = options;
    const newline = minify ? '' : '\n';
    const indentStr = indent && !minify ? '  ' : '';

    // Build SVG opening tag
    const { viewBox, width, height } = document;
    const viewBoxAttr = `viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}"`;
    const widthAttr = width ? ` width="${width}"` : '';
    const heightAttr = height ? ` height="${height}"` : '';

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" ${viewBoxAttr}${widthAttr}${heightAttr}>`;
    
    // Add title if provided
    if (document.title) {
      svg += `${newline}${indentStr}<title>${this.escapeXml(document.title)}</title>`;
    }

    // Add description if provided
    if (document.description) {
      svg += `${newline}${indentStr}<desc>${this.escapeXml(document.description)}</desc>`;
    }

    // Add definitions if provided
    if (document.defs && document.defs.length > 0) {
      svg += `${newline}${indentStr}<defs>`;
      document.defs.forEach(def => {
        svg += `${newline}${indentStr}${indentStr}${def.content}`;
      });
      svg += `${newline}${indentStr}</defs>`;
    }

    // Add global styles if provided
    if (document.style) {
      svg += `${newline}${indentStr}<style>${document.style}</style>`;
    }

    // Render elements
    document.elements.forEach(element => {
      svg += newline + this.renderElement(element, indentStr, { indent, minify });
    });

    svg += `${newline}</svg>`;

    return svg;
  }

  private renderElement(element: SvgAnyElement, baseIndent: string, options: { indent: boolean; minify: boolean }): string {
    const { indent, minify } = options;
    const indentStr = indent && !minify ? baseIndent + '  ' : baseIndent;

    try {
      switch (element.type) {
        case 'circle':
          return this.renderCircle(element, indentStr);
        case 'rect':
          return this.renderRect(element, indentStr);
        case 'line':
          return this.renderLine(element, indentStr);
        case 'path':
          return this.renderPath(element, indentStr);
        case 'text':
          return this.renderText(element, indentStr);
        case 'group':
          return this.renderGroup(element, indentStr, options);
        default:
          throw new SvgRenderError(`Unsupported element type: ${(element as any).type}`, element);
      }
    } catch (error) {
      logger.error(`Failed to render element`, { element, error });
      throw error;
    }
  }

  private renderCircle(element: SvgAnyElement & { type: 'circle' }, indent: string): string {
    const { cx, cy, r } = element as any;
    const attrs = this.buildCommonAttributes(element);
    return `${indent}<circle cx="${cx}" cy="${cy}" r="${r}"${attrs} />`;
  }

  private renderRect(element: SvgAnyElement & { type: 'rect' }, indent: string): string {
    const { x, y, width, height, rx, ry } = element as any;
    let attrs = this.buildCommonAttributes(element);
    
    if (rx !== undefined) attrs += ` rx="${rx}"`;
    if (ry !== undefined) attrs += ` ry="${ry}"`;

    return `${indent}<rect x="${x}" y="${y}" width="${width}" height="${height}"${attrs} />`;
  }

  private renderLine(element: SvgAnyElement & { type: 'line' }, indent: string): string {
    const { x1, y1, x2, y2 } = element as any;
    const attrs = this.buildCommonAttributes(element);
    return `${indent}<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${attrs} />`;
  }

  private renderPath(element: SvgAnyElement & { type: 'path' }, indent: string): string {
    const { d } = element as any;
    const attrs = this.buildCommonAttributes(element);
    return `${indent}<path d="${d}"${attrs} />`;
  }

  private renderText(element: SvgAnyElement & { type: 'text' }, indent: string): string {
    const { x, y, content } = element as any;
    const attrs = this.buildCommonAttributes(element);
    const escapedContent = this.escapeXml(content);
    return `${indent}<text x="${x}" y="${y}"${attrs}>${escapedContent}</text>`;
  }

  private renderGroup(element: SvgAnyElement & { type: 'group' }, indent: string, options: { indent: boolean; minify: boolean }): string {
    const { children } = element as any;
    const { minify } = options;
    const newline = minify ? '' : '\n';
    const attrs = this.buildCommonAttributes(element);
    
    let result = `${indent}<g${attrs}>`;
    
    children.forEach((child: SvgAnyElement) => {
      result += newline + this.renderElement(child, indent, options);
    });
    
    result += `${newline}${indent}</g>`;
    return result;
  }

  private buildCommonAttributes(element: SvgAnyElement): string {
    let attrs = '';
    
    if (element.id) {
      attrs += ` id="${this.escapeAttribute(element.id)}"`;
    }
    
    if (element.className) {
      attrs += ` class="${this.escapeAttribute(element.className)}"`;
    }
    
    if (element.transform) {
      attrs += ` transform="${this.escapeAttribute(element.transform)}"`;
    }
    
    if (element.clipPath) {
      attrs += ` clip-path="${this.escapeAttribute(element.clipPath)}"`;
    }
    
    if (element.mask) {
      attrs += ` mask="${this.escapeAttribute(element.mask)}"`;
    }
    
    // Handle styles
    if (element.style) {
      const styleStr = this.buildStyleString(element.style);
      if (styleStr) {
        attrs += ` style="${styleStr}"`;
      }
    }
    
    return attrs;
  }

  private buildStyleString(style: SvgStyle | TextStyle): string {
    const parts: string[] = [];
    
    Object.entries(style).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert camelCase to kebab-case
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        parts.push(`${kebabKey}:${value}`);
      }
    });
    
    return parts.join(';');
  }

  private optimizeSvg(svg: string): string {
    // Basic optimizations
    let optimized = svg;
    
    // Remove extra whitespace (but preserve content whitespace)
    optimized = optimized.replace(/>\s+</g, '><');
    
    // Remove empty style attributes
    optimized = optimized.replace(/\s+style=""/g, '');
    
    // Remove unnecessary spaces in attributes
    optimized = optimized.replace(/\s+([a-z-]+)="/g, ' $1="');
    
    logger.debug('SVG optimization completed', {
      originalSize: svg.length,
      optimizedSize: optimized.length,
      reduction: svg.length - optimized.length
    });
    
    return optimized;
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private escapeAttribute(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;');
  }
}
