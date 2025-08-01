/**
 * SVG Document Processor
 */
import { SvgDocument, SvgAnyElement, ViewBox } from '../types/svg.js';
export interface SvgDocumentSpec {
    viewBox: ViewBox;
    elements: SvgAnyElement[];
    width?: number;
    height?: number;
    title?: string;
    description?: string;
    optimize?: boolean;
    validate?: boolean;
    generateMetadata?: boolean;
}
export interface ProcessingResult {
    document: SvgDocument;
    svg: string;
    warnings: string[];
    errors: string[];
    metadata: DocumentMetadata;
    processingTime: number;
}
export interface DocumentMetadata {
    complexity: 'low' | 'medium' | 'high';
    features: string[];
    accessibility: {
        hasTitle: boolean;
        hasDescription: boolean;
    };
    compliance?: string;
}
export declare class SvgDocumentProcessor {
    private readonly renderer;
    constructor();
    processDocument(spec: SvgDocumentSpec): Promise<ProcessingResult>;
    validateDocument(document: SvgDocument): Promise<{
        valid: boolean;
        errors: string[];
        warnings: string[];
    }>;
    getProcessingStats(): {
        totalDocuments: number;
        totalProcessingTime: number;
        averageProcessingTime: number;
    };
}
//# sourceMappingURL=SvgDocumentProcessor.d.ts.map