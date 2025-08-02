/**
 * SVG Template Engine
 *
 * Provides template management, variable substitution, and reusable pattern
 * creation for SVG documents. Supports hierarchical templates, composition,
 * and design system integration.
 */
import { SvgDocument } from '../../types/svg.js';
export type VariableType = 'string' | 'number' | 'boolean' | 'color' | 'point' | 'size' | 'array' | 'object';
export interface TemplateVariable {
    name: string;
    type: VariableType;
    defaultValue: any;
    description: string;
    required: boolean;
    constraints?: VariableConstraints;
}
export interface VariableConstraints {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    enumValues?: string[];
    minItems?: number;
    maxItems?: number;
    validation?: (value: any) => boolean;
}
export interface TemplateMetadata {
    category: string;
    complexity: 'simple' | 'intermediate' | 'advanced';
    dimensions: {
        width: number;
        height: number;
    };
    createdAt: Date;
    updatedAt: Date;
    usage: TemplateUsage;
    library?: string;
    renderingHints?: Record<string, any>;
}
export interface TemplateUsage {
    totalUses: number;
    lastUsed?: Date;
    popularVariations: Record<string, number>;
}
export interface SvgTemplate {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    tags: string[];
    variables: TemplateVariable[];
    document: SvgDocument;
    metadata: TemplateMetadata;
}
export interface TemplateInstance {
    templateId: string;
    instanceId: string;
    variables: Record<string, any>;
    document: SvgDocument;
    metadata: InstanceMetadata;
}
export interface InstanceMetadata {
    createdAt: Date;
    renderTime: number;
    variableCount: number;
    elementCount: number;
}
export interface TemplateLibrary {
    id: string;
    name: string;
    description?: string;
    version: string;
    templates: SvgTemplate[];
    categories: TemplateCategory[];
    metadata: LibraryMetadata;
}
export interface TemplateCategory {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    templateIds: string[];
}
export interface LibraryMetadata {
    totalTemplates: number;
    totalCategories: number;
    createdAt: Date;
    updatedAt: Date;
    author?: string;
    license?: string;
}
export interface TemplateSearchCriteria {
    name?: string;
    category?: string;
    tags?: string[];
    author?: string;
    complexity?: 'simple' | 'intermediate' | 'advanced';
    dimensions?: {
        width?: number;
        height?: number;
    };
}
/**
 * SVG Template Engine
 */
export declare class SvgTemplateEngine {
    private templates;
    private libraries;
    private instances;
    /**
     * Register a template in the engine
     */
    registerTemplate(template: SvgTemplate): void;
    /**
     * Create instance from template with variable substitution
     */
    instantiateTemplate(templateId: string, variables: Record<string, any>, instanceId?: string): Promise<TemplateInstance>;
    /**
     * Create a template library
     */
    createLibrary(id: string, name: string, description?: string, templates?: SvgTemplate[]): TemplateLibrary;
    /**
     * Get template by ID
     */
    getTemplate(templateId: string): SvgTemplate | undefined;
    /**
     * Get all templates
     */
    getAllTemplates(): SvgTemplate[];
    /**
     * Search templates by criteria
     */
    searchTemplates(criteria: TemplateSearchCriteria): SvgTemplate[];
    /**
     * Get template instance by ID
     */
    getInstance(instanceId: string): TemplateInstance | undefined;
    /**
     * Get all instances
     */
    getAllInstances(): TemplateInstance[];
    /**
     * Get library by ID
     */
    getLibrary(libraryId: string): TemplateLibrary | undefined;
    /**
     * Apply default values for template variables
     */
    private applyDefaultValues;
    /**
     * Validate template structure and content
     */
    private validateTemplate;
    /**
     * Validate variables against template requirements
     */
    private validateVariables;
    /**
     * Validate a variable value against its constraints (public method for tests)
     */
    validateVariable(variable: TemplateVariable, value: any): boolean;
    /**
     * Validate variable type
     */
    private validateVariableType;
    /**
     * Validate variable constraints
     */
    private validateVariableConstraints;
    /**
     * Process template with variable substitution
     */
    private processTemplate;
    /**
     * Apply variable substitution to the document
     */
    private applyVariableSubstitution;
    /**
     * Generate categories from templates
     */
    private generateCategories;
    /**
     * Generate unique instance ID
     */
    private generateInstanceId;
    /**
     * Update template usage statistics
     */
    private updateTemplateUsage;
    /**
     * Count elements in document
     */
    private countElements;
    /**
     * Validate color value
     */
    private isValidColor;
}
//# sourceMappingURL=SvgTemplateEngine.d.ts.map