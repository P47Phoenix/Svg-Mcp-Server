/**
 * SVG Template Engine
 *
 * Provides template management, variable substitution, and reusable pattern
 * creation for SVG documents. Supports hierarchical templates, composition,
 * and design system integration.
 */
import { logger } from '../../utils/logger.js';
/**
 * SVG Template Engine
 */
export class SvgTemplateEngine {
    templates = new Map();
    libraries = new Map();
    instances = new Map();
    /**
     * Register a template in the engine
     */
    registerTemplate(template) {
        logger.info('Registering SVG template', {
            id: template.id,
            name: template.name,
            variableCount: template.variables.length
        });
        // Check for duplicates
        if (this.templates.has(template.id)) {
            throw new Error(`Template ${template.id} already exists`);
        }
        // Validate template
        this.validateTemplate(template);
        // Store template
        this.templates.set(template.id, { ...template });
        // Update usage metadata
        template.metadata.updatedAt = new Date();
        logger.info('SVG template registered successfully', { id: template.id });
    }
    /**
     * Create instance from template with variable substitution
     */
    async instantiateTemplate(templateId, variables, instanceId) {
        const startTime = Date.now();
        logger.info('Instantiating SVG template', { templateId, variableCount: Object.keys(variables).length });
        const template = this.templates.get(templateId);
        if (!template) {
            throw new Error(`Template not found: ${templateId}`);
        }
        // Apply default values for missing variables
        const finalVariables = this.applyDefaultValues(template, variables);
        // Validate variables
        this.validateVariables(template, finalVariables);
        // Generate instance ID
        const finalInstanceId = instanceId || this.generateInstanceId(templateId);
        try {
            // Create document with variable substitution
            const document = await this.processTemplate(template, finalVariables);
            // Create instance
            const instance = {
                templateId,
                instanceId: finalInstanceId,
                variables: { ...finalVariables },
                document,
                metadata: {
                    createdAt: new Date(),
                    renderTime: Date.now() - startTime,
                    variableCount: Object.keys(finalVariables).length,
                    elementCount: this.countElements(document)
                }
            };
            // Store instance
            this.instances.set(finalInstanceId, instance);
            // Update template usage
            this.updateTemplateUsage(templateId, finalVariables);
            logger.info('SVG template instantiated successfully', {
                templateId,
                instanceId: finalInstanceId,
                renderTime: instance.metadata.renderTime
            });
            return instance;
        }
        catch (error) {
            logger.error('SVG template instantiation failed', { error, templateId, variables });
            throw error;
        }
    }
    /**
     * Create a template library
     */
    createLibrary(id, name, description, templates = []) {
        logger.info('Creating SVG template library', { id, name, templateCount: templates.length });
        const library = {
            id,
            name,
            description: description || '',
            version: '1.0.0',
            templates: [...templates],
            categories: this.generateCategories(templates),
            metadata: {
                totalTemplates: templates.length,
                totalCategories: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        };
        // Update category count
        library.metadata.totalCategories = library.categories.length;
        // Store library
        this.libraries.set(id, library);
        // Associate templates with library
        templates.forEach(template => {
            template.metadata.library = id;
        });
        logger.info('SVG template library created', {
            id,
            templateCount: library.templates.length,
            categoryCount: library.categories.length
        });
        return library;
    }
    /**
     * Get template by ID
     */
    getTemplate(templateId) {
        return this.templates.get(templateId);
    }
    /**
     * Get all templates
     */
    getAllTemplates() {
        return Array.from(this.templates.values());
    }
    /**
     * Search templates by criteria
     */
    searchTemplates(criteria) {
        const templates = Array.from(this.templates.values());
        return templates.filter(template => {
            // Name search (case insensitive substring match)
            if (criteria.name && !template.name.toLowerCase().includes(criteria.name.toLowerCase())) {
                return false;
            }
            // Category filter
            if (criteria.category && template.metadata.category !== criteria.category) {
                return false;
            }
            // Tags filter (template must have at least one of the specified tags)
            if (criteria.tags && criteria.tags.length > 0) {
                const templateTags = template.tags.map(tag => tag.toLowerCase());
                const searchTags = criteria.tags.map(tag => tag.toLowerCase());
                const hasMatchingTag = searchTags.some(searchTag => templateTags.some(templateTag => templateTag.includes(searchTag)));
                if (!hasMatchingTag) {
                    return false;
                }
            }
            // Author filter
            if (criteria.author && template.author !== criteria.author) {
                return false;
            }
            // Complexity filter
            if (criteria.complexity && template.metadata.complexity !== criteria.complexity) {
                return false;
            }
            // Dimensions filter
            if (criteria.dimensions) {
                if (criteria.dimensions.width && template.metadata.dimensions.width !== criteria.dimensions.width) {
                    return false;
                }
                if (criteria.dimensions.height && template.metadata.dimensions.height !== criteria.dimensions.height) {
                    return false;
                }
            }
            return true;
        });
    }
    /**
     * Get template instance by ID
     */
    getInstance(instanceId) {
        return this.instances.get(instanceId);
    }
    /**
     * Get all instances
     */
    getAllInstances() {
        return Array.from(this.instances.values());
    }
    /**
     * Get library by ID
     */
    getLibrary(libraryId) {
        return this.libraries.get(libraryId);
    }
    /**
     * Apply default values for template variables
     */
    applyDefaultValues(template, variables) {
        const result = { ...variables };
        for (const templateVar of template.variables) {
            if (result[templateVar.name] === undefined && templateVar.defaultValue !== undefined) {
                result[templateVar.name] = templateVar.defaultValue;
            }
        }
        return result;
    }
    /**
     * Validate template structure and content
     */
    validateTemplate(template) {
        if (!template.id || typeof template.id !== 'string') {
            throw new Error('Template must have a valid ID');
        }
        if (!template.name || typeof template.name !== 'string') {
            throw new Error('Template must have a valid name');
        }
        if (!template.document || !template.document.viewBox) {
            throw new Error('Template must have a valid SVG document with viewBox');
        }
        // Validate variables
        template.variables.forEach(variable => {
            if (!variable.name || typeof variable.name !== 'string') {
                throw new Error('Template variable must have a valid name');
            }
            if (!variable.type || !['string', 'number', 'boolean', 'color', 'point', 'size', 'array', 'object'].includes(variable.type)) {
                throw new Error(`Template variable ${variable.name} has invalid type: ${variable.type}`);
            }
        });
    }
    /**
     * Validate variables against template requirements
     */
    validateVariables(template, variables) {
        for (const templateVar of template.variables) {
            const value = variables[templateVar.name];
            // Check required variables
            if (templateVar.required && (value === undefined || value === null)) {
                throw new Error(`Required variable missing: ${templateVar.name}`);
            }
            // Validate type and constraints if value is provided
            if (value !== undefined && value !== null) {
                if (!this.validateVariableType(value, templateVar.type)) {
                    throw new Error(`Variable ${templateVar.name} has invalid type. Expected: ${templateVar.type}`);
                }
                if (templateVar.constraints) {
                    this.validateVariableConstraints(value, templateVar.constraints, templateVar.name);
                }
            }
        }
    }
    /**
     * Validate a variable value against its constraints (public method for tests)
     */
    validateVariable(variable, value) {
        try {
            // Check type first
            if (!this.validateVariableType(value, variable.type)) {
                return false;
            }
            // Check constraints if they exist
            if (variable.constraints) {
                this.validateVariableConstraints(value, variable.constraints, variable.name);
            }
            return true;
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Validate variable type
     */
    validateVariableType(value, type) {
        switch (type) {
            case 'string':
                return typeof value === 'string';
            case 'number':
                return typeof value === 'number' && !isNaN(value);
            case 'boolean':
                return typeof value === 'boolean';
            case 'color':
                return typeof value === 'string' && this.isValidColor(value);
            case 'point':
                return typeof value === 'object' &&
                    typeof value.x === 'number' &&
                    typeof value.y === 'number';
            case 'size':
                return typeof value === 'object' &&
                    typeof value.width === 'number' &&
                    typeof value.height === 'number';
            case 'array':
                return Array.isArray(value);
            case 'object':
                return typeof value === 'object' && value !== null && !Array.isArray(value);
            default:
                return false;
        }
    }
    /**
     * Validate variable constraints
     */
    validateVariableConstraints(value, constraints, name) {
        if (constraints.min !== undefined && value < constraints.min) {
            throw new Error(`Variable ${name} is below minimum value: ${constraints.min}`);
        }
        if (constraints.max !== undefined && value > constraints.max) {
            throw new Error(`Variable ${name} is above maximum value: ${constraints.max}`);
        }
        if (constraints.enumValues && !constraints.enumValues.includes(value)) {
            throw new Error(`Variable ${name} must be one of: ${constraints.enumValues.join(', ')}`);
        }
        if (constraints.pattern && typeof value === 'string') {
            const regex = new RegExp(constraints.pattern);
            if (!regex.test(value)) {
                throw new Error(`Variable ${name} does not match pattern: ${constraints.pattern}`);
            }
        }
        if (constraints.validation && !constraints.validation(value)) {
            throw new Error(`Variable ${name} failed custom validation`);
        }
    }
    /**
     * Process template with variable substitution
     */
    async processTemplate(template, variables) {
        // Deep clone the template document
        const document = JSON.parse(JSON.stringify(template.document));
        // Apply default values for missing variables
        const finalVariables = { ...variables };
        for (const templateVar of template.variables) {
            if (finalVariables[templateVar.name] === undefined) {
                finalVariables[templateVar.name] = templateVar.defaultValue;
            }
        }
        // Apply variable substitution
        this.applyVariableSubstitution(document, finalVariables);
        return document;
    }
    /**
     * Apply variable substitution to the document
     */
    applyVariableSubstitution(document, variables) {
        const substituteValue = (value) => {
            if (typeof value === 'string') {
                // Replace {{variableName}} with actual values
                return value.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
                    return variables[varName] !== undefined ? variables[varName] : match;
                });
            }
            else if (Array.isArray(value)) {
                return value.map(substituteValue);
            }
            else if (value && typeof value === 'object') {
                const result = {};
                for (const [key, val] of Object.entries(value)) {
                    result[key] = substituteValue(val);
                }
                return result;
            }
            return value;
        };
        // Apply substitution to elements
        document.elements = document.elements.map(element => substituteValue(element));
    }
    /**
     * Generate categories from templates
     */
    generateCategories(templates) {
        const categoryMap = new Map();
        templates.forEach(template => {
            const categoryName = template.metadata.category;
            if (!categoryMap.has(categoryName)) {
                categoryMap.set(categoryName, {
                    id: categoryName.toLowerCase().replace(/\s+/g, '-'),
                    name: categoryName,
                    description: `Templates in the ${categoryName} category`,
                    templateIds: []
                });
            }
            const category = categoryMap.get(categoryName);
            category.templateIds.push(template.id);
        });
        return Array.from(categoryMap.values());
    }
    /**
     * Generate unique instance ID
     */
    generateInstanceId(templateId) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `${templateId}-${timestamp}-${random}`;
    }
    /**
     * Update template usage statistics
     */
    updateTemplateUsage(templateId, variables) {
        const template = this.templates.get(templateId);
        if (template) {
            template.metadata.usage.totalUses++;
            template.metadata.usage.lastUsed = new Date();
            // Track popular variable combinations
            const variationKey = JSON.stringify(variables);
            template.metadata.usage.popularVariations[variationKey] =
                (template.metadata.usage.popularVariations[variationKey] || 0) + 1;
        }
    }
    /**
     * Count elements in document
     */
    countElements(document) {
        const countInElements = (elements) => {
            return elements.reduce((count, element) => {
                let elementCount = 1;
                if ('children' in element && element.children) {
                    elementCount += countInElements(element.children);
                }
                return count + elementCount;
            }, 0);
        };
        return countInElements(document.elements);
    }
    /**
     * Validate color value
     */
    isValidColor(color) {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
        const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;
        const namedColors = ['red', 'green', 'blue', 'yellow', 'black', 'white', 'orange', 'purple', 'pink', 'gray', 'grey', 'brown'];
        return hexPattern.test(color) ||
            rgbPattern.test(color) ||
            rgbaPattern.test(color) ||
            namedColors.includes(color.toLowerCase());
    }
}
//# sourceMappingURL=SvgTemplateEngine.js.map