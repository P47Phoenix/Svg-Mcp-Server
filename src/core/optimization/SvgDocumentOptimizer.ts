/**
 * SVG Document Optimizer - Simplified Version
 * 
 * Basic optimization capabilities for SVG documents focused on
 * performance and file size reduction while maintaining quality.
 */

import { SvgDocument, SvgAnyElement } from '../../types/svg.js';
import { logger } from '../../utils/logger.js';

// Optimization configuration
export interface OptimizationOptions {
  removeEmptyElements?: boolean;
  removeRedundantAttributes?: boolean;
  roundCoordinates?: boolean;
  coordinatePrecision?: number;
  preserveAccessibility?: boolean;
}

// Optimization result
export interface OptimizationResult {
  originalDocument: SvgDocument;
  optimizedDocument: SvgDocument;
  statistics: OptimizationStatistics;
  applied: OptimizationApplied[];
  warnings: string[];
}

export interface OptimizationStatistics {
  originalElementCount: number;
  optimizedElementCount: number;
  elementReduction: number;
  coordinatesRounded: number;
  attributesRemoved: number;
  estimatedSizeReduction: number;
}

export interface OptimizationApplied {
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  elementCount?: number;
}

/**
 * SVG Document Optimizer
 */
export class SvgDocumentOptimizer {
  private options: Required<OptimizationOptions>;

  constructor(options: OptimizationOptions = {}) {
    this.options = {
      removeEmptyElements: options.removeEmptyElements ?? true,
      removeRedundantAttributes: options.removeRedundantAttributes ?? true,
      roundCoordinates: options.roundCoordinates ?? true,
      coordinatePrecision: options.coordinatePrecision ?? 2,
      preserveAccessibility: options.preserveAccessibility ?? true
    };
  }

  /**
   * Optimize an SVG document
   */
  async optimize(document: SvgDocument): Promise<OptimizationResult> {
    logger.info('Starting SVG document optimization', { 
      elementCount: document.elements.length
    });

    const originalDocument = JSON.parse(JSON.stringify(document));
    let optimizedDocument = JSON.parse(JSON.stringify(document));
    
    const statistics: OptimizationStatistics = {
      originalElementCount: this.countElements(originalDocument),
      optimizedElementCount: 0,
      elementReduction: 0,
      coordinatesRounded: 0,
      attributesRemoved: 0,
      estimatedSizeReduction: 0
    };

    const applied: OptimizationApplied[] = [];
    const warnings: string[] = [];

    try {
      // Phase 1: Remove empty elements
      if (this.options.removeEmptyElements) {
        const result = this.removeEmptyElements(optimizedDocument);
        optimizedDocument = result.document;
        if (result.removedCount > 0) {
          applied.push({
            type: 'remove_empty_elements',
            description: `Removed ${result.removedCount} empty elements`,
            impact: 'medium',
            elementCount: result.removedCount
          });
        }
      }

      // Phase 2: Remove redundant attributes
      if (this.options.removeRedundantAttributes) {
        const result = this.removeRedundantAttributes(optimizedDocument);
        optimizedDocument = result.document;
        statistics.attributesRemoved = result.removedCount;
        if (result.removedCount > 0) {
          applied.push({
            type: 'remove_redundant_attributes',
            description: `Removed ${result.removedCount} redundant attributes`,
            impact: 'low',
          });
        }
      }

      // Phase 3: Round coordinates
      if (this.options.roundCoordinates) {
        const result = this.roundCoordinates(optimizedDocument);
        optimizedDocument = result.document;
        statistics.coordinatesRounded = result.roundedCount;
        if (result.roundedCount > 0) {
          applied.push({
            type: 'round_coordinates',
            description: `Rounded ${result.roundedCount} coordinates to ${this.options.coordinatePrecision} decimal places`,
            impact: 'low'
          });
        }
      }

      // Calculate final statistics
      statistics.optimizedElementCount = this.countElements(optimizedDocument);
      statistics.elementReduction = statistics.originalElementCount - statistics.optimizedElementCount;
      statistics.estimatedSizeReduction = this.calculateSizeReduction(originalDocument, optimizedDocument);

      logger.info('SVG optimization completed', {
        originalElements: statistics.originalElementCount,
        optimizedElements: statistics.optimizedElementCount,
        reduction: statistics.elementReduction
      });

      return {
        originalDocument,
        optimizedDocument,
        statistics,
        applied,
        warnings
      };

    } catch (error) {
      logger.error('SVG optimization failed', { error, document });
      throw error;
    }
  }

  /**
   * Remove empty elements (groups with no children, etc.)
   */
  private removeEmptyElements(document: SvgDocument): { document: SvgDocument; removedCount: number } {
    let removedCount = 0;

    const cleanElements = (elements: SvgAnyElement[]): SvgAnyElement[] => {
      return elements.filter(element => {
        if (element.type === 'group') {
          const groupElement = element as any;
          if (groupElement.children) {
            groupElement.children = cleanElements(groupElement.children);
            
            // Remove if empty (no children)
            if (groupElement.children.length === 0) {
              removedCount++;
              return false;
            }
          }
        }
        return true;
      });
    };

    document.elements = cleanElements(document.elements);
    return { document, removedCount };
  }

  /**
   * Remove redundant attributes (default values)
   */
  private removeRedundantAttributes(document: SvgDocument): { document: SvgDocument; removedCount: number } {
    let removedCount = 0;

    const cleanElement = (element: SvgAnyElement): SvgAnyElement => {
      const cleaned = { ...element };

      // Remove default style values
      if (cleaned.style) {
        const style = { ...cleaned.style };
        
        // Remove default fill
        if (style.fill === 'black') {
          delete style.fill;
          removedCount++;
        }
        
        // Remove default stroke width
        if (style.strokeWidth === 1) {
          delete style.strokeWidth;
          removedCount++;
        }
        
        // Remove default opacity
        if (style.opacity === 1) {
          delete style.opacity;
          removedCount++;
        }

        // Update style or remove if empty
        if (Object.keys(style).length === 0) {
          delete cleaned.style;
        } else {
          cleaned.style = style;
        }
      }

      // Process children for groups
      if (element.type === 'group') {
        const groupElement = element as any;
        if (groupElement.children) {
          (cleaned as any).children = groupElement.children.map(cleanElement);
        }
      }

      return cleaned;
    };

    document.elements = document.elements.map(cleanElement);
    return { document, removedCount };
  }

  /**
   * Round coordinates to specified precision
   */
  private roundCoordinates(document: SvgDocument): { document: SvgDocument; roundedCount: number } {
    let roundedCount = 0;
    const precision = this.options.coordinatePrecision;

    const roundNumber = (num: number): number => {
      const rounded = Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
      if (rounded !== num) roundedCount++;
      return rounded;
    };

    const processElement = (element: SvgAnyElement): SvgAnyElement => {
      const processed = { ...element };

      switch (element.type) {
        case 'circle': {
          const circleEl = element as any;
          if (circleEl.cx !== undefined) (processed as any).cx = roundNumber(circleEl.cx);
          if (circleEl.cy !== undefined) (processed as any).cy = roundNumber(circleEl.cy);
          if (circleEl.r !== undefined) (processed as any).r = roundNumber(circleEl.r);
          break;
        }
        case 'rect': {
          const rectEl = element as any;
          if (rectEl.x !== undefined) (processed as any).x = roundNumber(rectEl.x);
          if (rectEl.y !== undefined) (processed as any).y = roundNumber(rectEl.y);
          if (rectEl.width !== undefined) (processed as any).width = roundNumber(rectEl.width);
          if (rectEl.height !== undefined) (processed as any).height = roundNumber(rectEl.height);
          if (rectEl.rx !== undefined) (processed as any).rx = roundNumber(rectEl.rx);
          if (rectEl.ry !== undefined) (processed as any).ry = roundNumber(rectEl.ry);
          break;
        }
        case 'line': {
          const lineEl = element as any;
          if (lineEl.x1 !== undefined) (processed as any).x1 = roundNumber(lineEl.x1);
          if (lineEl.y1 !== undefined) (processed as any).y1 = roundNumber(lineEl.y1);
          if (lineEl.x2 !== undefined) (processed as any).x2 = roundNumber(lineEl.x2);
          if (lineEl.y2 !== undefined) (processed as any).y2 = roundNumber(lineEl.y2);
          break;
        }
        case 'text': {
          const textEl = element as any;
          if (textEl.x !== undefined) (processed as any).x = roundNumber(textEl.x);
          if (textEl.y !== undefined) (processed as any).y = roundNumber(textEl.y);
          break;
        }
        case 'group': {
          const groupEl = element as any;
          if (groupEl.children) {
            (processed as any).children = groupEl.children.map(processElement);
          }
          break;
        }
      }

      return processed;
    };

    document.elements = document.elements.map(processElement);

    // Round ViewBox
    const originalViewBox = document.viewBox;
    document.viewBox = {
      x: roundNumber(originalViewBox.x),
      y: roundNumber(originalViewBox.y),
      width: roundNumber(originalViewBox.width),
      height: roundNumber(originalViewBox.height)
    };

    return { document, roundedCount };
  }

  /**
   * Count total number of elements
   */
  private countElements(document: SvgDocument): number {
    const countInElements = (elements: SvgAnyElement[]): number => {
      return elements.reduce((count, element) => {
        if (element.type === 'group') {
          const groupEl = element as any;
          return count + 1 + (groupEl.children ? countInElements(groupEl.children) : 0);
        }
        return count + 1;
      }, 0);
    };

    return countInElements(document.elements);
  }

  /**
   * Calculate estimated size reduction
   */
  private calculateSizeReduction(original: SvgDocument, optimized: SvgDocument): number {
    const originalSize = JSON.stringify(original).length;
    const optimizedSize = JSON.stringify(optimized).length;
    
    return Math.round(((originalSize - optimizedSize) / originalSize) * 100);
  }
}

/**
 * Optimization preset configurations
 */
export class OptimizationPresets {
  static readonly AGGRESSIVE: OptimizationOptions = {
    removeEmptyElements: true,
    removeRedundantAttributes: true,
    roundCoordinates: true,
    coordinatePrecision: 1,
    preserveAccessibility: true
  };

  static readonly BALANCED: OptimizationOptions = {
    removeEmptyElements: true,
    removeRedundantAttributes: true,
    roundCoordinates: true,
    coordinatePrecision: 2,
    preserveAccessibility: true
  };

  static readonly CONSERVATIVE: OptimizationOptions = {
    removeEmptyElements: true,
    removeRedundantAttributes: false,
    roundCoordinates: true,
    coordinatePrecision: 3,
    preserveAccessibility: true
  };
}
