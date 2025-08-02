/**
 * Validation Factory
 *
 * Central factory for creating and managing SVG validation instances.
 * Provides easy access to all validation capabilities with sensible defaults.
 */
import { ValidationResult, ValidationContext } from './ElementValidators.js';
import { DocumentValidator, DocumentValidationOptions, DocumentValidationResult } from './DocumentValidator.js';
import { SvgDocument, SvgAnyElement } from '../../types/svg.js';
export type ValidationPreset = 'strict' | 'standard' | 'minimal' | 'performance' | 'accessibility' | 'custom';
export interface ValidationSuiteConfig {
    preset?: ValidationPreset;
    elementValidation?: boolean;
    documentValidation?: boolean;
    documentOptions?: DocumentValidationOptions;
}
export interface ValidationSuiteResult {
    overall: {
        valid: boolean;
        score: number;
        summary: string;
    };
    elementResults?: Map<number, ValidationResult>;
    documentResult?: DocumentValidationResult;
    recommendations: string[];
    quickFixes: QuickFix[];
}
export interface QuickFix {
    type: 'add' | 'remove' | 'modify';
    description: string;
    property?: string;
    suggestedValue?: any;
    priority: 'high' | 'medium' | 'low';
    automated: boolean;
}
/**
 * Main validation factory and orchestrator
 */
export declare class ValidationFactory {
    private static presetConfigs;
    /**
     * Create a document validator with preset configuration
     */
    static createDocumentValidator(preset?: ValidationPreset): DocumentValidator;
    /**
     * Create a document validator with custom options
     */
    static createCustomDocumentValidator(options: DocumentValidationOptions): DocumentValidator;
    /**
     * Validate a single SVG element
     */
    static validateElement(element: SvgAnyElement, context?: ValidationContext): ValidationResult;
    /**
     * Run a complete validation suite on an SVG document
     */
    static validateDocument(document: SvgDocument, config?: ValidationSuiteConfig): Promise<ValidationSuiteResult>;
    /**
     * Quick validation for performance-critical scenarios
     */
    static quickValidate(document: SvgDocument): {
        valid: boolean;
        criticalIssues: string[];
        elementCount: number;
    };
    /**
     * Validate and suggest automatic fixes
     */
    static validateWithAutoFix(document: SvgDocument, preset?: ValidationPreset): Promise<{
        validationResult: ValidationSuiteResult;
        autoFixedDocument?: SvgDocument;
        appliedFixes: string[];
    }>;
    private static calculateOverallResults;
    private static getSuggestionPriority;
    private static isAutomatable;
    private static applyFix;
}
export declare const SVGValidator: {
    /**
     * Quick validation for basic structure and critical errors
     */
    quick: (document: SvgDocument) => {
        valid: boolean;
        criticalIssues: string[];
        elementCount: number;
    };
    /**
     * Standard validation with balanced checks
     */
    standard: (document: SvgDocument) => Promise<ValidationSuiteResult>;
    /**
     * Strict validation with all checks enabled
     */
    strict: (document: SvgDocument) => Promise<ValidationSuiteResult>;
    /**
     * Performance-focused validation
     */
    performance: (document: SvgDocument) => Promise<ValidationSuiteResult>;
    /**
     * Accessibility-focused validation
     */
    accessibility: (document: SvgDocument) => Promise<ValidationSuiteResult>;
    /**
     * Validation with automatic fixes applied
     */
    withAutoFix: (document: SvgDocument, preset?: ValidationPreset) => Promise<{
        validationResult: ValidationSuiteResult;
        autoFixedDocument?: SvgDocument;
        appliedFixes: string[];
    }>;
};
//# sourceMappingURL=ValidationFactory.d.ts.map