/**
 * SVG Document Validator
 *
 * Comprehensive document-level validation including cross-element validation,
 * structural integrity, accessibility compliance, and performance analysis.
 */
import { SvgDocument, SvgAnyElement } from '../../types/svg.js';
import { ValidationResult } from './ElementValidators.js';
export interface DocumentValidationOptions {
    checkAccessibility?: boolean;
    checkPerformance?: boolean;
    checkCompliance?: boolean;
    targetCompliance?: 'svg11' | 'svg20' | 'svg21';
    maxElements?: number;
    maxNestingDepth?: number;
    allowUnknownElements?: boolean;
}
export interface DocumentValidationResult extends ValidationResult {
    elementResults: Map<number, ValidationResult>;
    documentStats: DocumentStats;
    compliance: ComplianceReport;
    accessibility: AccessibilityReport;
    performance: PerformanceReport;
}
export interface DocumentStats {
    totalElements: number;
    elementTypes: Map<string, number>;
    maxNestingDepth: number;
    totalIds: number;
    duplicateIds: string[];
    unreferencedIds: string[];
    missingReferences: string[];
    documentSize: {
        estimatedBytes: number;
        complexity: 'low' | 'medium' | 'high' | 'extreme';
    };
}
export interface ComplianceReport {
    standard: string;
    version: string;
    compliant: boolean;
    violations: ComplianceViolation[];
    recommendations: string[];
}
export interface ComplianceViolation {
    rule: string;
    description: string;
    elements: SvgAnyElement[];
    severity: 'error' | 'warning';
}
export interface AccessibilityReport {
    score: number;
    hasTitle: boolean;
    hasDescription: boolean;
    hasAriaLabels: boolean;
    colorContrastIssues: ColorContrastIssue[];
    textSizeIssues: TextSizeIssue[];
    recommendations: string[];
}
export interface ColorContrastIssue {
    element: SvgAnyElement;
    foreground: string;
    background: string;
    ratio: number;
    minimumRequired: number;
}
export interface TextSizeIssue {
    element: SvgAnyElement;
    fontSize: number;
    recommended: number;
}
export interface PerformanceReport {
    score: number;
    renderComplexity: number;
    memoryEstimate: number;
    issues: PerformanceIssue[];
    optimizations: string[];
}
export interface PerformanceIssue {
    type: 'complexity' | 'size' | 'nesting' | 'redundancy';
    description: string;
    impact: 'low' | 'medium' | 'high';
    elements?: SvgAnyElement[];
}
/**
 * SVG Document Validator
 */
export declare class DocumentValidator {
    private options;
    constructor(options?: DocumentValidationOptions);
    /**
     * Validate an entire SVG document
     */
    validateDocument(document: SvgDocument): Promise<DocumentValidationResult>;
    private validateDocumentStructure;
    private buildValidationContext;
    private extractIdFromUrl;
    private validateViewBox;
    private validateCrossElementReferences;
    private validateIdUniqueness;
    private generateDocumentStats;
    private generateComplianceReport;
    private generateAccessibilityReport;
    private generatePerformanceReport;
    private createEmptyComplianceReport;
    private createEmptyAccessibilityReport;
    private createEmptyPerformanceReport;
}
//# sourceMappingURL=DocumentValidator.d.ts.map