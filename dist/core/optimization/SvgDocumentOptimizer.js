/**
 * SVG Document Optimizer - Simplified Version
 *
 * Basic optimization capabilities for SVG documents focused on
 * performance and file size reduction while maintaining quality.
 */
import { logger } from '../../utils/logger.js';
/**
 * SVG Document Optimizer
 */
export class SvgDocumentOptimizer {
    options;
    constructor(options = {}) {
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
    async optimize(document) {
        logger.info('Starting SVG document optimization', {
            elementCount: document.elements.length
        });
        const originalDocument = JSON.parse(JSON.stringify(document));
        let optimizedDocument = JSON.parse(JSON.stringify(document));
        const statistics = {
            originalElementCount: this.countElements(originalDocument),
            optimizedElementCount: 0,
            elementReduction: 0,
            coordinatesRounded: 0,
            attributesRemoved: 0,
            estimatedSizeReduction: 0
        };
        const applied = [];
        const warnings = [];
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
        }
        catch (error) {
            logger.error('SVG optimization failed', { error, document });
            throw error;
        }
    }
    /**
     * Remove empty elements (groups with no children, etc.)
     */
    removeEmptyElements(document) {
        let removedCount = 0;
        const cleanElements = (elements) => {
            return elements.filter(element => {
                if (element.type === 'group') {
                    const groupElement = element;
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
    removeRedundantAttributes(document) {
        let removedCount = 0;
        const cleanElement = (element) => {
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
                }
                else {
                    cleaned.style = style;
                }
            }
            // Process children for groups
            if (element.type === 'group') {
                const groupElement = element;
                if (groupElement.children) {
                    cleaned.children = groupElement.children.map(cleanElement);
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
    roundCoordinates(document) {
        let roundedCount = 0;
        const precision = this.options.coordinatePrecision;
        const roundNumber = (num) => {
            const rounded = Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
            if (rounded !== num)
                roundedCount++;
            return rounded;
        };
        const processElement = (element) => {
            const processed = { ...element };
            switch (element.type) {
                case 'circle': {
                    const circleEl = element;
                    if (circleEl.cx !== undefined)
                        processed.cx = roundNumber(circleEl.cx);
                    if (circleEl.cy !== undefined)
                        processed.cy = roundNumber(circleEl.cy);
                    if (circleEl.r !== undefined)
                        processed.r = roundNumber(circleEl.r);
                    break;
                }
                case 'rect': {
                    const rectEl = element;
                    if (rectEl.x !== undefined)
                        processed.x = roundNumber(rectEl.x);
                    if (rectEl.y !== undefined)
                        processed.y = roundNumber(rectEl.y);
                    if (rectEl.width !== undefined)
                        processed.width = roundNumber(rectEl.width);
                    if (rectEl.height !== undefined)
                        processed.height = roundNumber(rectEl.height);
                    if (rectEl.rx !== undefined)
                        processed.rx = roundNumber(rectEl.rx);
                    if (rectEl.ry !== undefined)
                        processed.ry = roundNumber(rectEl.ry);
                    break;
                }
                case 'line': {
                    const lineEl = element;
                    if (lineEl.x1 !== undefined)
                        processed.x1 = roundNumber(lineEl.x1);
                    if (lineEl.y1 !== undefined)
                        processed.y1 = roundNumber(lineEl.y1);
                    if (lineEl.x2 !== undefined)
                        processed.x2 = roundNumber(lineEl.x2);
                    if (lineEl.y2 !== undefined)
                        processed.y2 = roundNumber(lineEl.y2);
                    break;
                }
                case 'text': {
                    const textEl = element;
                    if (textEl.x !== undefined)
                        processed.x = roundNumber(textEl.x);
                    if (textEl.y !== undefined)
                        processed.y = roundNumber(textEl.y);
                    break;
                }
                case 'group': {
                    const groupEl = element;
                    if (groupEl.children) {
                        processed.children = groupEl.children.map(processElement);
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
    countElements(document) {
        const countInElements = (elements) => {
            return elements.reduce((count, element) => {
                if (element.type === 'group') {
                    const groupEl = element;
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
    calculateSizeReduction(original, optimized) {
        const originalSize = JSON.stringify(original).length;
        const optimizedSize = JSON.stringify(optimized).length;
        return Math.round(((originalSize - optimizedSize) / originalSize) * 100);
    }
}
/**
 * Optimization preset configurations
 */
export class OptimizationPresets {
    static AGGRESSIVE = {
        removeEmptyElements: true,
        removeRedundantAttributes: true,
        roundCoordinates: true,
        coordinatePrecision: 1,
        preserveAccessibility: true
    };
    static BALANCED = {
        removeEmptyElements: true,
        removeRedundantAttributes: true,
        roundCoordinates: true,
        coordinatePrecision: 2,
        preserveAccessibility: true
    };
    static CONSERVATIVE = {
        removeEmptyElements: true,
        removeRedundantAttributes: false,
        roundCoordinates: true,
        coordinatePrecision: 3,
        preserveAccessibility: true
    };
}
//# sourceMappingURL=SvgDocumentOptimizer.js.map