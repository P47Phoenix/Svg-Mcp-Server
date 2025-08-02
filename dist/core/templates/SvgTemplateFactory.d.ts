/**
 * SVG Template Factory
 *
 * Factory for creating common SVG templates including icons, charts,
 * decorative patterns, logos, and design elements. Provides built-in
 * template library with customizable parameters.
 */
import { SvgTemplateEngine } from './SvgTemplateEngine.js';
/**
 * SVG Template Factory
 */
export declare class SvgTemplateFactory {
    private templateEngine;
    constructor(templateEngine: SvgTemplateEngine);
    /**
     * Initialize factory with built-in templates
     */
    initialize(): void;
    /**
     * Register icon templates
     */
    private registerIconTemplates;
    private createArrowIconTemplate;
    private createCheckIconTemplate;
    private createStarIconTemplate;
    private createHeartIconTemplate;
    /**
     * Register chart templates
     */
    private registerChartTemplates;
    private createBarChartTemplate;
    private createPieChartTemplate;
    private createLineChartTemplate;
    /**
     * Register pattern templates
     */
    private registerPatternTemplates;
    private createGridPatternTemplate;
    private createDotsPatternTemplate;
    private createStripesPatternTemplate;
    /**
     * Register logo templates
     */
    private registerLogoTemplates;
    private createSimpleLogoTemplate;
    private createBadgeLogoTemplate;
    /**
     * Register decoration templates
     */
    private registerDecorationTemplates;
    private createBorderDecorationTemplate;
    private createDividerTemplate;
}
//# sourceMappingURL=SvgTemplateFactory.d.ts.map