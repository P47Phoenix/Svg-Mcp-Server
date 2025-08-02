/**
 * SVG Document Processor
 */
import { SvgValidationError } from '../types/svg.js';
import { SvgRenderer } from './SvgRenderer.js';
import { logger } from '../utils/logger.js';
import { ValidationFactory } from './validation/ValidationFactory.js';
export class SvgDocumentProcessor {
    renderer;
    constructor() {
        this.renderer = new SvgRenderer();
    }
    async processDocument(spec) {
        const startTime = Date.now();
        const errors = [];
        const warnings = [];
        try {
            const document = {
                viewBox: spec.viewBox,
                elements: spec.elements,
                ...(spec.width !== undefined && { width: spec.width }),
                ...(spec.height !== undefined && { height: spec.height }),
                ...(spec.title && { title: spec.title }),
                ...(spec.description && { description: spec.description })
            };
            if (spec.validate !== false) {
                const validationPreset = typeof spec.validate === 'string' ? spec.validate : 'standard';
                const validation = await this.validateDocument(document, validationPreset);
                errors.push(...validation.errors);
                warnings.push(...validation.warnings);
                if (!validation.valid) {
                    throw new SvgValidationError('Document validation failed', { errors, warnings });
                }
            }
            const svg = await this.renderer.render(document);
            // Enhanced metadata generation using validation results
            let metadata;
            if (spec.generateMetadata !== false) {
                metadata = await this.generateMetadata(document);
            }
            else {
                metadata = {
                    complexity: document.elements.length < 10 ? 'low' : document.elements.length < 100 ? 'medium' : 'high',
                    features: [...new Set(document.elements.map(el => el.type))],
                    accessibility: {
                        hasTitle: !!document.title,
                        hasDescription: !!document.description
                    },
                    compliance: 'svg20'
                };
            }
            const processingTime = Date.now() - startTime;
            return { document, svg, warnings, errors, metadata, processingTime };
        }
        catch (error) {
            logger.error('Document processing failed', { error, spec });
            throw error;
        }
    }
    async validateDocument(document, preset = 'standard') {
        try {
            const validationResult = await ValidationFactory.validateDocument(document, { preset });
            const errors = validationResult.documentResult?.errors.map(e => e.message) || [];
            const warnings = validationResult.documentResult?.warnings.map(w => w.message) || [];
            // Add element-level errors and warnings
            if (validationResult.elementResults) {
                for (const elementResult of validationResult.elementResults.values()) {
                    errors.push(...elementResult.errors.map(e => e.message));
                    warnings.push(...elementResult.warnings.map(w => w.message));
                }
            }
            return {
                valid: validationResult.overall.valid,
                errors,
                warnings,
                validationResult
            };
        }
        catch (error) {
            logger.error('Validation failed', { error, document });
            return {
                valid: false,
                errors: ['Validation system error: ' + error.message],
                warnings: []
            };
        }
    }
    async generateMetadata(document) {
        try {
            // Use performance validation to get detailed stats
            const validationResult = await ValidationFactory.validateDocument(document, {
                preset: 'performance',
                documentValidation: true,
                elementValidation: false
            });
            const stats = validationResult.documentResult?.documentStats;
            const accessibility = validationResult.documentResult?.accessibility;
            return {
                complexity: stats?.documentSize.complexity || 'low',
                features: Array.from(stats?.elementTypes.keys() || []),
                accessibility: {
                    hasTitle: accessibility?.hasTitle || !!document.title,
                    hasDescription: accessibility?.hasDescription || !!document.description
                },
                compliance: validationResult.documentResult?.compliance.compliant ? 'svg20' : 'non-compliant'
            };
        }
        catch (error) {
            logger.warn('Failed to generate enhanced metadata, using basic metadata', { error });
            // Fallback to basic metadata
            return {
                complexity: document.elements.length < 10 ? 'low' : document.elements.length < 100 ? 'medium' : 'high',
                features: [...new Set(document.elements.map(el => el.type))],
                accessibility: {
                    hasTitle: !!document.title,
                    hasDescription: !!document.description
                },
                compliance: 'svg20'
            };
        }
    }
    getProcessingStats() {
        // Simple stats for now
        return {
            totalDocuments: 0,
            totalProcessingTime: 0,
            averageProcessingTime: 0
        };
    }
}
//# sourceMappingURL=SvgDocumentProcessor.js.map