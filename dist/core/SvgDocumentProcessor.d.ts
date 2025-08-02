/**
 * SVG Document Processor
 */
import { SvgDocument, SvgAnyElement, ViewBox } from '../types/svg.js';
import { ValidationSuiteResult, ValidationPreset } from './validation/ValidationFactory.js';
import { OptimizationOptions, OptimizationResult } from './optimization/SvgDocumentOptimizer.js';
import { TransformationType, TransformationParams, TransformationResult } from './optimization/SvgTransformationEngine.js';
export interface SvgDocumentSpec {
    viewBox: ViewBox;
    elements: SvgAnyElement[];
    width?: number;
    height?: number;
    title?: string;
    description?: string;
    optimize?: boolean | OptimizationOptions;
    validate?: boolean | ValidationPreset;
    generateMetadata?: boolean;
    transform?: {
        type: TransformationType;
        params: TransformationParams;
    }[];
}
export interface ProcessingResult {
    document: SvgDocument;
    svg: string;
    warnings: string[];
    errors: string[];
    metadata: DocumentMetadata;
    processingTime: number;
    optimization?: OptimizationResult;
    transformation?: TransformationResult;
}
export interface DocumentMetadata {
    complexity: 'low' | 'medium' | 'high' | 'extreme';
    features: string[];
    accessibility: {
        hasTitle: boolean;
        hasDescription: boolean;
    };
    compliance?: string;
    performance?: {
        elementCount: number;
        estimatedFileSize: number;
        renderComplexity: 'low' | 'medium' | 'high';
    };
}
export declare class SvgDocumentProcessor {
    private readonly renderer;
    constructor();
    processDocument(spec: SvgDocumentSpec): Promise<ProcessingResult>;
    validateDocument(document: SvgDocument, preset?: ValidationPreset): Promise<{
        valid: boolean;
        errors: string[];
        warnings: string[];
        validationResult?: ValidationSuiteResult;
    }>;
    /**
     * Optimize an SVG document
     */
    optimizeDocument(document: SvgDocument, options?: OptimizationOptions): Promise<OptimizationResult>;
    /**
     * Transform an SVG document
     */
    transformDocument(document: SvgDocument, transformation: TransformationType, params: TransformationParams): Promise<TransformationResult>;
    /**
     * Apply multiple transformations to an SVG document
     */
    transformDocumentMultiple(document: SvgDocument, transformations: Array<{
        type: TransformationType;
        params: TransformationParams;
    }>): Promise<TransformationResult>;
    generateMetadata(document: SvgDocument): Promise<DocumentMetadata>;
    getProcessingStats(): {
        totalDocuments: number;
        totalProcessingTime: number;
        averageProcessingTime: number;
    };
}
//# sourceMappingURL=SvgDocumentProcessor.d.ts.map