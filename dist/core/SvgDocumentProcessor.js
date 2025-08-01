/**
 * SVG Document Processor
 */
import { SvgValidationError } from '../types/svg.js';
import { SvgRenderer } from './SvgRenderer.js';
import { logger } from '../utils/logger.js';
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
                const validation = await this.validateDocument(document);
                errors.push(...validation.errors);
                warnings.push(...validation.warnings);
                if (!validation.valid) {
                    throw new SvgValidationError('Document validation failed', { errors, warnings });
                }
            }
            const svg = await this.renderer.render(document);
            const metadata = {
                complexity: document.elements.length < 10 ? 'low' : document.elements.length < 100 ? 'medium' : 'high',
                features: [...new Set(document.elements.map(el => el.type))],
                accessibility: {
                    hasTitle: !!document.title,
                    hasDescription: !!document.description
                },
                compliance: 'svg20'
            };
            const processingTime = Date.now() - startTime;
            return { document, svg, warnings, errors, metadata, processingTime };
        }
        catch (error) {
            logger.error('Document processing failed', { error, spec });
            throw error;
        }
    }
    async validateDocument(document) {
        const errors = [];
        const warnings = [];
        if (document.viewBox.width <= 0) {
            errors.push('ViewBox width must be positive');
        }
        if (document.viewBox.height <= 0) {
            errors.push('ViewBox height must be positive');
        }
        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
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