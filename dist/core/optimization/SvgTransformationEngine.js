/**
 * SVG Transformation Engine - Simplified Version
 *
 * Basic transformation capabilities for SVG documents including
 * geometric transformations like scale, translate, rotate, and flip.
 */
import { logger } from '../../utils/logger.js';
/**
 * SVG Transformation Engine
 */
export class SvgTransformationEngine {
    /**
     * Apply geometric transformation to document
     */
    async transform(document, transformation, params) {
        logger.info('Applying SVG transformation', { transformation, params });
        const originalDocument = JSON.parse(JSON.stringify(document));
        let transformedDocument = JSON.parse(JSON.stringify(document));
        const originalBounds = this.calculateDocumentBounds(originalDocument);
        try {
            switch (transformation) {
                case 'scale':
                    transformedDocument = this.applyScale(transformedDocument, params.scale);
                    break;
                case 'translate':
                    transformedDocument = this.applyTranslation(transformedDocument, params.translate);
                    break;
                case 'rotate':
                    transformedDocument = this.applyRotation(transformedDocument, params.rotate);
                    break;
                case 'flipHorizontal':
                    transformedDocument = this.applyHorizontalFlip(transformedDocument);
                    break;
                case 'flipVertical':
                    transformedDocument = this.applyVerticalFlip(transformedDocument);
                    break;
                default:
                    throw new Error(`Unsupported transformation type: ${transformation}`);
            }
            const transformedBounds = this.calculateDocumentBounds(transformedDocument);
            const result = {
                originalDocument,
                transformedDocument,
                appliedTransforms: [{
                        type: transformation,
                        parameters: params,
                        elementCount: this.countElements(transformedDocument),
                        description: this.getTransformationDescription(transformation, params)
                    }],
                metadata: {
                    originalBounds,
                    transformedBounds,
                    scaleFactors: this.calculateScaleFactors(originalBounds, transformedBounds),
                    rotationAngle: params.rotate?.angle || 0,
                    translation: params.translate || { x: 0, y: 0 }
                }
            };
            logger.info('SVG transformation completed', {
                transformation,
                originalBounds,
                transformedBounds
            });
            return result;
        }
        catch (error) {
            logger.error('SVG transformation failed', { error, transformation, params });
            throw error;
        }
    }
    /**
     * Apply multiple transformations in sequence
     */
    async transformMultiple(document, transformations) {
        logger.info('Applying multiple SVG transformations', { count: transformations.length });
        const originalDocument = JSON.parse(JSON.stringify(document));
        let currentDocument = JSON.parse(JSON.stringify(document));
        const appliedTransforms = [];
        for (const { type, params } of transformations) {
            const result = await this.transform(currentDocument, type, params);
            currentDocument = result.transformedDocument;
            appliedTransforms.push(...result.appliedTransforms);
        }
        const originalBounds = this.calculateDocumentBounds(originalDocument);
        const transformedBounds = this.calculateDocumentBounds(currentDocument);
        return {
            originalDocument,
            transformedDocument: currentDocument,
            appliedTransforms,
            metadata: {
                originalBounds,
                transformedBounds,
                scaleFactors: this.calculateScaleFactors(originalBounds, transformedBounds),
                rotationAngle: appliedTransforms
                    .filter(t => t.type === 'rotate')
                    .reduce((sum, t) => sum + (t.parameters.rotate?.angle || 0), 0),
                translation: appliedTransforms
                    .filter(t => t.type === 'translate')
                    .reduce((acc, t) => ({
                    x: acc.x + (t.parameters.translate?.x || 0),
                    y: acc.y + (t.parameters.translate?.y || 0)
                }), { x: 0, y: 0 })
            }
        };
    }
    // ===== PRIVATE TRANSFORMATION METHODS =====
    /**
     * Apply scale transformation
     */
    applyScale(document, scale) {
        const transformElement = (element) => {
            const transformed = { ...element };
            switch (element.type) {
                case 'circle': {
                    const circleEl = element;
                    if (circleEl.cx !== undefined)
                        transformed.cx = circleEl.cx * scale.x;
                    if (circleEl.cy !== undefined)
                        transformed.cy = circleEl.cy * scale.y;
                    if (circleEl.r !== undefined)
                        transformed.r = circleEl.r * Math.min(scale.x, scale.y);
                    break;
                }
                case 'rect': {
                    const rectEl = element;
                    if (rectEl.x !== undefined)
                        transformed.x = rectEl.x * scale.x;
                    if (rectEl.y !== undefined)
                        transformed.y = rectEl.y * scale.y;
                    if (rectEl.width !== undefined)
                        transformed.width = rectEl.width * scale.x;
                    if (rectEl.height !== undefined)
                        transformed.height = rectEl.height * scale.y;
                    if (rectEl.rx !== undefined)
                        transformed.rx = rectEl.rx * scale.x;
                    if (rectEl.ry !== undefined)
                        transformed.ry = rectEl.ry * scale.y;
                    break;
                }
                case 'line': {
                    const lineEl = element;
                    if (lineEl.x1 !== undefined)
                        transformed.x1 = lineEl.x1 * scale.x;
                    if (lineEl.y1 !== undefined)
                        transformed.y1 = lineEl.y1 * scale.y;
                    if (lineEl.x2 !== undefined)
                        transformed.x2 = lineEl.x2 * scale.x;
                    if (lineEl.y2 !== undefined)
                        transformed.y2 = lineEl.y2 * scale.y;
                    break;
                }
                case 'text': {
                    const textEl = element;
                    if (textEl.x !== undefined)
                        transformed.x = textEl.x * scale.x;
                    if (textEl.y !== undefined)
                        transformed.y = textEl.y * scale.y;
                    break;
                }
                case 'group': {
                    const groupEl = element;
                    if (groupEl.children) {
                        transformed.children = groupEl.children.map(transformElement);
                    }
                    break;
                }
            }
            return transformed;
        };
        document.elements = document.elements.map(transformElement);
        // Scale ViewBox
        document.viewBox = {
            x: document.viewBox.x * scale.x,
            y: document.viewBox.y * scale.y,
            width: document.viewBox.width * scale.x,
            height: document.viewBox.height * scale.y
        };
        return document;
    }
    /**
     * Apply translation transformation
     */
    applyTranslation(document, translation) {
        const transformElement = (element) => {
            const transformed = { ...element };
            switch (element.type) {
                case 'circle': {
                    const circleEl = element;
                    if (circleEl.cx !== undefined)
                        transformed.cx = circleEl.cx + translation.x;
                    if (circleEl.cy !== undefined)
                        transformed.cy = circleEl.cy + translation.y;
                    break;
                }
                case 'rect': {
                    const rectEl = element;
                    if (rectEl.x !== undefined)
                        transformed.x = rectEl.x + translation.x;
                    if (rectEl.y !== undefined)
                        transformed.y = rectEl.y + translation.y;
                    break;
                }
                case 'line': {
                    const lineEl = element;
                    if (lineEl.x1 !== undefined)
                        transformed.x1 = lineEl.x1 + translation.x;
                    if (lineEl.y1 !== undefined)
                        transformed.y1 = lineEl.y1 + translation.y;
                    if (lineEl.x2 !== undefined)
                        transformed.x2 = lineEl.x2 + translation.x;
                    if (lineEl.y2 !== undefined)
                        transformed.y2 = lineEl.y2 + translation.y;
                    break;
                }
                case 'text': {
                    const textEl = element;
                    if (textEl.x !== undefined)
                        transformed.x = textEl.x + translation.x;
                    if (textEl.y !== undefined)
                        transformed.y = textEl.y + translation.y;
                    break;
                }
                case 'group': {
                    const groupEl = element;
                    if (groupEl.children) {
                        transformed.children = groupEl.children.map(transformElement);
                    }
                    break;
                }
            }
            return transformed;
        };
        document.elements = document.elements.map(transformElement);
        return document;
    }
    /**
     * Apply rotation transformation
     */
    applyRotation(document, rotation) {
        const bounds = this.calculateDocumentBounds(document);
        const centerX = rotation.centerX ?? bounds.centerX;
        const centerY = rotation.centerY ?? bounds.centerY;
        const angleRad = (rotation.angle * Math.PI) / 180;
        const rotatePoint = (x, y) => {
            const translatedX = x - centerX;
            const translatedY = y - centerY;
            return {
                x: translatedX * Math.cos(angleRad) - translatedY * Math.sin(angleRad) + centerX,
                y: translatedX * Math.sin(angleRad) + translatedY * Math.cos(angleRad) + centerY
            };
        };
        const transformElement = (element) => {
            const transformed = { ...element };
            switch (element.type) {
                case 'circle': {
                    const circleEl = element;
                    if (circleEl.cx !== undefined && circleEl.cy !== undefined) {
                        const rotatedCenter = rotatePoint(circleEl.cx, circleEl.cy);
                        transformed.cx = rotatedCenter.x;
                        transformed.cy = rotatedCenter.y;
                    }
                    break;
                }
                case 'rect': {
                    const rectEl = element;
                    if (rectEl.x !== undefined && rectEl.y !== undefined) {
                        const rotatedCorner = rotatePoint(rectEl.x, rectEl.y);
                        transformed.x = rotatedCorner.x;
                        transformed.y = rotatedCorner.y;
                    }
                    break;
                }
                case 'line': {
                    const lineEl = element;
                    if (lineEl.x1 !== undefined && lineEl.y1 !== undefined) {
                        const rotatedStart = rotatePoint(lineEl.x1, lineEl.y1);
                        transformed.x1 = rotatedStart.x;
                        transformed.y1 = rotatedStart.y;
                    }
                    if (lineEl.x2 !== undefined && lineEl.y2 !== undefined) {
                        const rotatedEnd = rotatePoint(lineEl.x2, lineEl.y2);
                        transformed.x2 = rotatedEnd.x;
                        transformed.y2 = rotatedEnd.y;
                    }
                    break;
                }
                case 'text': {
                    const textEl = element;
                    if (textEl.x !== undefined && textEl.y !== undefined) {
                        const rotatedText = rotatePoint(textEl.x, textEl.y);
                        transformed.x = rotatedText.x;
                        transformed.y = rotatedText.y;
                    }
                    break;
                }
                case 'group': {
                    const groupEl = element;
                    if (groupEl.children) {
                        transformed.children = groupEl.children.map(transformElement);
                    }
                    break;
                }
            }
            return transformed;
        };
        document.elements = document.elements.map(transformElement);
        return document;
    }
    /**
     * Apply horizontal flip
     */
    applyHorizontalFlip(document) {
        return this.applyReflection(document, { axis: 'y' });
    }
    /**
     * Apply vertical flip
     */
    applyVerticalFlip(document) {
        return this.applyReflection(document, { axis: 'x' });
    }
    /**
     * Apply reflection transformation
     */
    applyReflection(document, reflection) {
        const bounds = this.calculateDocumentBounds(document);
        const reflectPoint = (x, y) => {
            let newX = x;
            let newY = y;
            if (reflection.axis === 'x') {
                newY = bounds.y + bounds.height - (y - bounds.y);
            }
            if (reflection.axis === 'y') {
                newX = bounds.x + bounds.width - (x - bounds.x);
            }
            return { x: newX, y: newY };
        };
        const transformElement = (element) => {
            const transformed = { ...element };
            switch (element.type) {
                case 'circle': {
                    const circleEl = element;
                    if (circleEl.cx !== undefined && circleEl.cy !== undefined) {
                        const reflectedCenter = reflectPoint(circleEl.cx, circleEl.cy);
                        transformed.cx = reflectedCenter.x;
                        transformed.cy = reflectedCenter.y;
                    }
                    break;
                }
                case 'rect': {
                    const rectEl = element;
                    if (rectEl.x !== undefined && rectEl.y !== undefined) {
                        const reflectedCorner = reflectPoint(rectEl.x, rectEl.y);
                        transformed.x = reflectedCorner.x;
                        transformed.y = reflectedCorner.y;
                    }
                    break;
                }
                case 'line': {
                    const lineEl = element;
                    if (lineEl.x1 !== undefined && lineEl.y1 !== undefined) {
                        const reflectedStart = reflectPoint(lineEl.x1, lineEl.y1);
                        transformed.x1 = reflectedStart.x;
                        transformed.y1 = reflectedStart.y;
                    }
                    if (lineEl.x2 !== undefined && lineEl.y2 !== undefined) {
                        const reflectedEnd = reflectPoint(lineEl.x2, lineEl.y2);
                        transformed.x2 = reflectedEnd.x;
                        transformed.y2 = reflectedEnd.y;
                    }
                    break;
                }
                case 'text': {
                    const textEl = element;
                    if (textEl.x !== undefined && textEl.y !== undefined) {
                        const reflectedText = reflectPoint(textEl.x, textEl.y);
                        transformed.x = reflectedText.x;
                        transformed.y = reflectedText.y;
                    }
                    break;
                }
                case 'group': {
                    const groupEl = element;
                    if (groupEl.children) {
                        transformed.children = groupEl.children.map(transformElement);
                    }
                    break;
                }
            }
            return transformed;
        };
        document.elements = document.elements.map(transformElement);
        return document;
    }
    // ===== HELPER METHODS =====
    /**
     * Calculate document bounds
     */
    calculateDocumentBounds(document) {
        const viewBox = document.viewBox;
        return {
            x: viewBox.x,
            y: viewBox.y,
            width: viewBox.width,
            height: viewBox.height,
            centerX: viewBox.x + viewBox.width / 2,
            centerY: viewBox.y + viewBox.height / 2
        };
    }
    /**
     * Calculate scale factors
     */
    calculateScaleFactors(original, transformed) {
        return {
            x: original.width !== 0 ? transformed.width / original.width : 1,
            y: original.height !== 0 ? transformed.height / original.height : 1
        };
    }
    /**
     * Count elements in document
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
     * Get transformation description
     */
    getTransformationDescription(type, params) {
        switch (type) {
            case 'scale':
                return `Scale by ${params.scale?.x}x${params.scale?.y}`;
            case 'rotate':
                return `Rotate by ${params.rotate?.angle}°`;
            case 'translate':
                return `Translate by (${params.translate?.x}, ${params.translate?.y})`;
            case 'flipHorizontal':
                return 'Flip horizontally';
            case 'flipVertical':
                return 'Flip vertically';
            default:
                return `Apply ${type} transformation`;
        }
    }
}
//# sourceMappingURL=SvgTransformationEngine.js.map