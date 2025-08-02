/**
 * SVG Document Optimizer - Simplified Version
 *
 * Basic optimization capabilities for SVG documents focused on
 * performance and file size reduction while maintaining quality.
 */
import { SvgDocument } from '../../types/svg.js';
export interface OptimizationOptions {
    removeEmptyElements?: boolean;
    removeRedundantAttributes?: boolean;
    roundCoordinates?: boolean;
    coordinatePrecision?: number;
    preserveAccessibility?: boolean;
}
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
export declare class SvgDocumentOptimizer {
    private options;
    constructor(options?: OptimizationOptions);
    /**
     * Optimize an SVG document
     */
    optimize(document: SvgDocument): Promise<OptimizationResult>;
    /**
     * Remove empty elements (groups with no children, etc.)
     */
    private removeEmptyElements;
    /**
     * Remove redundant attributes (default values)
     */
    private removeRedundantAttributes;
    /**
     * Round coordinates to specified precision
     */
    private roundCoordinates;
    /**
     * Count total number of elements
     */
    private countElements;
    /**
     * Calculate estimated size reduction
     */
    private calculateSizeReduction;
}
/**
 * Optimization preset configurations
 */
export declare class OptimizationPresets {
    static readonly AGGRESSIVE: OptimizationOptions;
    static readonly BALANCED: OptimizationOptions;
    static readonly CONSERVATIVE: OptimizationOptions;
}
//# sourceMappingURL=SvgDocumentOptimizer.d.ts.map