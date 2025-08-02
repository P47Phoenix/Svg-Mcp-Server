/**
 * SVG Transformation Engine - Simplified Version
 *
 * Basic transformation capabilities for SVG documents including
 * geometric transformations like scale, translate, rotate, and flip.
 */
import { SvgDocument } from '../../types/svg.js';
export type TransformationType = 'scale' | 'translate' | 'rotate' | 'flipHorizontal' | 'flipVertical';
export interface TransformationParams {
    scale?: {
        x: number;
        y: number;
    };
    translate?: {
        x: number;
        y: number;
    };
    rotate?: {
        angle: number;
        centerX?: number;
        centerY?: number;
    };
}
export interface TransformationResult {
    originalDocument: SvgDocument;
    transformedDocument: SvgDocument;
    appliedTransforms: AppliedTransform[];
    metadata: TransformationMetadata;
}
export interface AppliedTransform {
    type: TransformationType;
    parameters: TransformationParams;
    elementCount: number;
    description: string;
}
export interface TransformationMetadata {
    originalBounds: BoundingBox;
    transformedBounds: BoundingBox;
    scaleFactors: {
        x: number;
        y: number;
    };
    rotationAngle: number;
    translation: {
        x: number;
        y: number;
    };
}
export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}
/**
 * SVG Transformation Engine
 */
export declare class SvgTransformationEngine {
    /**
     * Apply geometric transformation to document
     */
    transform(document: SvgDocument, transformation: TransformationType, params: TransformationParams): Promise<TransformationResult>;
    /**
     * Apply multiple transformations in sequence
     */
    transformMultiple(document: SvgDocument, transformations: Array<{
        type: TransformationType;
        params: TransformationParams;
    }>): Promise<TransformationResult>;
    /**
     * Apply scale transformation
     */
    private applyScale;
    /**
     * Apply translation transformation
     */
    private applyTranslation;
    /**
     * Apply rotation transformation
     */
    private applyRotation;
    /**
     * Apply horizontal flip
     */
    private applyHorizontalFlip;
    /**
     * Apply vertical flip
     */
    private applyVerticalFlip;
    /**
     * Apply reflection transformation
     */
    private applyReflection;
    /**
     * Calculate document bounds
     */
    private calculateDocumentBounds;
    /**
     * Calculate scale factors
     */
    private calculateScaleFactors;
    /**
     * Count elements in document
     */
    private countElements;
    /**
     * Get transformation description
     */
    private getTransformationDescription;
}
//# sourceMappingURL=SvgTransformationEngine.d.ts.map