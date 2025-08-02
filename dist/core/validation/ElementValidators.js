/**
 * SVG Element Validators
 *
 * Comprehensive validation modules for individual SVG elements with detailed
 * error reporting, compliance checking, and semantic validation.
 */
/**
 * Base Element Validator
 */
export class BaseElementValidator {
    errors = [];
    warnings = [];
    suggestions = [];
    addError(code, message, element, property, value) {
        const error = {
            code,
            message,
            severity: 'error'
        };
        if (element !== undefined)
            error.element = element;
        if (property !== undefined)
            error.property = property;
        if (value !== undefined)
            error.value = value;
        this.errors.push(error);
    }
    addWarning(code, message, element, property, value) {
        const warning = {
            code,
            message,
            severity: 'warning'
        };
        if (element !== undefined)
            warning.element = element;
        if (property !== undefined)
            warning.property = property;
        if (value !== undefined)
            warning.value = value;
        this.warnings.push(warning);
    }
    addSuggestion(code, message, suggestion, element, property) {
        const sug = {
            code,
            message,
            suggestion,
            severity: 'info'
        };
        if (element !== undefined)
            sug.element = element;
        if (property !== undefined)
            sug.property = property;
        this.suggestions.push(sug);
    }
    reset() {
        this.errors = [];
        this.warnings = [];
        this.suggestions = [];
    }
    validateCommonProperties(element) {
        // Validate ID uniqueness (checked in context)
        if (element.id && element.id.trim() === '') {
            this.addError('INVALID_ID', 'Element ID cannot be empty', element, 'id', element.id);
        }
        // Validate class name format
        if (element.className && !this.isValidClassName(element.className)) {
            this.addWarning('INVALID_CLASS_NAME', 'Class name contains invalid characters', element, 'className', element.className);
        }
        // Validate transform syntax
        if (element.transform && !this.isValidTransform(element.transform)) {
            this.addError('INVALID_TRANSFORM', 'Transform contains invalid syntax', element, 'transform', element.transform);
        }
        // Validate style properties
        if (element.style) {
            this.validateStyleProperties(element);
        }
    }
    isValidClassName(className) {
        // CSS class name validation (simplified)
        return /^[a-zA-Z][\w\-]*$/.test(className);
    }
    isValidTransform(transform) {
        // Basic transform validation (simplified)
        const transformFunctions = /^(matrix|translate|scale|rotate|skewX|skewY)\s*\([^)]*\)(\s+(matrix|translate|scale|rotate|skewX|skewY)\s*\([^)]*\))*\s*$/;
        return transformFunctions.test(transform.trim());
    }
    validateStyleProperties(element) {
        const style = element.style;
        // Validate opacity values
        if (style.opacity !== undefined && (style.opacity < 0 || style.opacity > 1)) {
            this.addError('INVALID_OPACITY', 'Opacity must be between 0 and 1', element, 'style.opacity', style.opacity);
        }
        if (style.fillOpacity !== undefined && (style.fillOpacity < 0 || style.fillOpacity > 1)) {
            this.addError('INVALID_FILL_OPACITY', 'Fill opacity must be between 0 and 1', element, 'style.fillOpacity', style.fillOpacity);
        }
        if (style.strokeOpacity !== undefined && (style.strokeOpacity < 0 || style.strokeOpacity > 1)) {
            this.addError('INVALID_STROKE_OPACITY', 'Stroke opacity must be between 0 and 1', element, 'style.strokeOpacity', style.strokeOpacity);
        }
        // Validate stroke width
        if (style.strokeWidth !== undefined && style.strokeWidth < 0) {
            this.addError('INVALID_STROKE_WIDTH', 'Stroke width cannot be negative', element, 'style.strokeWidth', style.strokeWidth);
        }
        // Validate color formats
        if (style.fill && !this.isValidColor(style.fill)) {
            this.addWarning('INVALID_COLOR_FORMAT', 'Fill color format may not be valid', element, 'style.fill', style.fill);
        }
        if (style.stroke && !this.isValidColor(style.stroke)) {
            this.addWarning('INVALID_COLOR_FORMAT', 'Stroke color format may not be valid', element, 'style.stroke', style.stroke);
        }
    }
    isValidColor(color) {
        // Basic color validation (hex, rgb, rgba, hsl, hsla, named colors)
        const colorPatterns = [
            /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/, // hex
            /^rgb\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/, // rgb
            /^rgba\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/, // rgba
            /^hsl\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/, // hsl
            /^hsla\s*\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(0|1|0?\.\d+)\s*\)$/, // hsla
        ];
        // Check if it's 'none', 'transparent', or a named color
        if (['none', 'transparent', 'currentColor'].includes(color)) {
            return true;
        }
        // Check named colors (basic set)
        const namedColors = ['red', 'green', 'blue', 'black', 'white', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray', 'grey'];
        if (namedColors.includes(color.toLowerCase())) {
            return true;
        }
        return colorPatterns.some(pattern => pattern.test(color));
    }
}
/**
 * Circle Element Validator
 */
export class CircleValidator extends BaseElementValidator {
    validate(element, _context) {
        this.reset();
        if (element.type !== 'circle') {
            this.addError('WRONG_ELEMENT_TYPE', `Expected circle element, got ${element.type}`, element);
            return this.getResult();
        }
        const circle = element;
        // Validate common properties
        this.validateCommonProperties(circle);
        // Validate circle-specific properties
        this.validateRadius(circle);
        this.validateCenter(circle);
        this.checkVisibility(circle);
        this.checkPerformance(circle);
        return this.getResult();
    }
    validateRadius(circle) {
        if (circle.r < 0) {
            this.addError('NEGATIVE_RADIUS', 'Circle radius cannot be negative', circle, 'r', circle.r);
        }
        else if (circle.r === 0) {
            this.addWarning('ZERO_RADIUS', 'Circle with zero radius will not be visible', circle, 'r', circle.r);
        }
        else if (circle.r > 10000) {
            this.addWarning('LARGE_RADIUS', 'Very large radius may impact performance', circle, 'r', circle.r);
        }
    }
    validateCenter(circle) {
        if (!Number.isFinite(circle.cx) || !Number.isFinite(circle.cy)) {
            this.addError('INVALID_CENTER', 'Circle center coordinates must be finite numbers', circle, 'cx,cy', { cx: circle.cx, cy: circle.cy });
        }
        if (Math.abs(circle.cx) > 1000000 || Math.abs(circle.cy) > 1000000) {
            this.addWarning('EXTREME_COORDINATES', 'Circle center coordinates are very large', circle, 'cx,cy', { cx: circle.cx, cy: circle.cy });
        }
    }
    checkVisibility(circle) {
        const style = circle.style;
        if (style?.fill === 'none' && (!style?.stroke || style.stroke === 'none')) {
            this.addWarning('INVISIBLE_ELEMENT', 'Circle has no fill or stroke and will not be visible', circle);
        }
    }
    checkPerformance(circle) {
        // Large circles with complex styling may impact performance
        if (circle.r > 1000 && circle.style?.strokeDasharray) {
            this.addSuggestion('PERFORMANCE_OPTIMIZATION', 'Large circle with stroke dash array may impact performance', 'Consider simplifying the stroke pattern or reducing the radius', circle);
        }
    }
    getResult() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            suggestions: this.suggestions
        };
    }
}
/**
 * Rectangle Element Validator
 */
export class RectValidator extends BaseElementValidator {
    validate(element, _context) {
        this.reset();
        if (element.type !== 'rect') {
            this.addError('WRONG_ELEMENT_TYPE', `Expected rect element, got ${element.type}`, element);
            return this.getResult();
        }
        const rect = element;
        // Validate common properties
        this.validateCommonProperties(rect);
        // Validate rectangle-specific properties
        this.validateDimensions(rect);
        this.validatePosition(rect);
        this.validateCornerRadius(rect);
        this.checkVisibility(rect);
        return this.getResult();
    }
    validateDimensions(rect) {
        if (rect.width < 0) {
            this.addError('NEGATIVE_WIDTH', 'Rectangle width cannot be negative', rect, 'width', rect.width);
        }
        else if (rect.width === 0) {
            this.addWarning('ZERO_WIDTH', 'Rectangle with zero width will not be visible', rect, 'width', rect.width);
        }
        if (rect.height < 0) {
            this.addError('NEGATIVE_HEIGHT', 'Rectangle height cannot be negative', rect, 'height', rect.height);
        }
        else if (rect.height === 0) {
            this.addWarning('ZERO_HEIGHT', 'Rectangle with zero height will not be visible', rect, 'height', rect.height);
        }
        if (rect.width > 10000 || rect.height > 10000) {
            this.addWarning('LARGE_DIMENSIONS', 'Very large rectangle dimensions may impact performance', rect, 'width,height', { width: rect.width, height: rect.height });
        }
    }
    validatePosition(rect) {
        if (!Number.isFinite(rect.x) || !Number.isFinite(rect.y)) {
            this.addError('INVALID_POSITION', 'Rectangle position coordinates must be finite numbers', rect, 'x,y', { x: rect.x, y: rect.y });
        }
    }
    validateCornerRadius(rect) {
        if (rect.rx !== undefined) {
            if (rect.rx < 0) {
                this.addError('NEGATIVE_CORNER_RADIUS', 'Corner radius rx cannot be negative', rect, 'rx', rect.rx);
            }
            else if (rect.rx > rect.width / 2) {
                this.addWarning('EXCESSIVE_CORNER_RADIUS', 'Corner radius rx is larger than half the width', rect, 'rx', rect.rx);
            }
        }
        if (rect.ry !== undefined) {
            if (rect.ry < 0) {
                this.addError('NEGATIVE_CORNER_RADIUS', 'Corner radius ry cannot be negative', rect, 'ry', rect.ry);
            }
            else if (rect.ry > rect.height / 2) {
                this.addWarning('EXCESSIVE_CORNER_RADIUS', 'Corner radius ry is larger than half the height', rect, 'ry', rect.ry);
            }
        }
    }
    checkVisibility(rect) {
        const style = rect.style;
        if (style?.fill === 'none' && (!style?.stroke || style.stroke === 'none')) {
            this.addWarning('INVISIBLE_ELEMENT', 'Rectangle has no fill or stroke and will not be visible', rect);
        }
    }
    getResult() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            suggestions: this.suggestions
        };
    }
}
/**
 * Line Element Validator
 */
export class LineValidator extends BaseElementValidator {
    validate(element, _context) {
        this.reset();
        if (element.type !== 'line') {
            this.addError('WRONG_ELEMENT_TYPE', `Expected line element, got ${element.type}`, element);
            return this.getResult();
        }
        const line = element;
        // Validate common properties
        this.validateCommonProperties(line);
        // Validate line-specific properties
        this.validateCoordinates(line);
        this.checkLineLength(line);
        this.checkVisibility(line);
        return this.getResult();
    }
    validateCoordinates(line) {
        const coords = [line.x1, line.y1, line.x2, line.y2];
        for (const [index, coord] of coords.entries()) {
            if (!Number.isFinite(coord)) {
                const coordName = ['x1', 'y1', 'x2', 'y2'][index];
                this.addError('INVALID_COORDINATE', `Line coordinate ${coordName} must be a finite number`, line, coordName, coord);
            }
        }
    }
    checkLineLength(line) {
        const length = Math.sqrt(Math.pow(line.x2 - line.x1, 2) + Math.pow(line.y2 - line.y1, 2));
        if (length === 0) {
            this.addWarning('ZERO_LENGTH_LINE', 'Line has zero length and will not be visible', line);
        }
        else if (length > 10000) {
            this.addWarning('VERY_LONG_LINE', 'Very long line may impact performance', line);
        }
    }
    checkVisibility(line) {
        const style = line.style;
        if (!style?.stroke || style.stroke === 'none') {
            this.addWarning('INVISIBLE_LINE', 'Line has no stroke and will not be visible', line);
        }
    }
    getResult() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            suggestions: this.suggestions
        };
    }
}
/**
 * Path Element Validator
 */
export class PathValidator extends BaseElementValidator {
    validate(element, _context) {
        this.reset();
        if (element.type !== 'path') {
            this.addError('WRONG_ELEMENT_TYPE', `Expected path element, got ${element.type}`, element);
            return this.getResult();
        }
        const path = element;
        // Validate common properties
        this.validateCommonProperties(path);
        // Validate path-specific properties
        this.validatePathData(path);
        this.checkComplexity(path);
        this.checkVisibility(path);
        return this.getResult();
    }
    validatePathData(path) {
        if (!path.d || path.d.trim() === '') {
            this.addError('EMPTY_PATH_DATA', 'Path data (d attribute) cannot be empty', path, 'd', path.d);
            return;
        }
        // Basic path data validation
        const pathCommands = /^[MmLlHhVvCcSsQqTtAaZz\d\s,.-]+$/;
        if (!pathCommands.test(path.d)) {
            this.addError('INVALID_PATH_DATA', 'Path data contains invalid characters', path, 'd', path.d);
        }
        // Check for proper path structure
        if (!this.hasValidPathStructure(path.d)) {
            this.addWarning('QUESTIONABLE_PATH_STRUCTURE', 'Path data structure may be malformed', path, 'd', path.d);
        }
    }
    hasValidPathStructure(pathData) {
        // Basic check: should start with M or m (move command)
        const trimmed = pathData.trim();
        return /^[Mm]/.test(trimmed);
    }
    checkComplexity(path) {
        if (path.d.length > 10000) {
            this.addWarning('COMPLEX_PATH', 'Very long path data may impact performance', path, 'd');
            this.addSuggestion('OPTIMIZE_PATH', 'Path is very complex', 'Consider simplifying the path or breaking it into smaller segments', path, 'd');
        }
        // Count path commands for complexity estimation
        const commandCount = (path.d.match(/[MmLlHhVvCcSsQqTtAaZz]/g) || []).length;
        if (commandCount > 1000) {
            this.addWarning('HIGH_COMMAND_COUNT', 'Path has many commands and may impact performance', path, 'd');
        }
    }
    checkVisibility(path) {
        const style = path.style;
        if (style?.fill === 'none' && (!style?.stroke || style.stroke === 'none')) {
            this.addWarning('INVISIBLE_ELEMENT', 'Path has no fill or stroke and will not be visible', path);
        }
    }
    getResult() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            suggestions: this.suggestions
        };
    }
}
/**
 * Text Element Validator
 */
export class TextValidator extends BaseElementValidator {
    validate(element, _context) {
        this.reset();
        if (element.type !== 'text') {
            this.addError('WRONG_ELEMENT_TYPE', `Expected text element, got ${element.type}`, element);
            return this.getResult();
        }
        const text = element;
        // Validate common properties
        this.validateCommonProperties(text);
        // Validate text-specific properties
        this.validateContent(text);
        this.validatePosition(text);
        this.validateTextStyle(text);
        this.checkAccessibility(text);
        return this.getResult();
    }
    validateContent(text) {
        if (!text.content || text.content.trim() === '') {
            this.addWarning('EMPTY_TEXT_CONTENT', 'Text element has no content', text, 'content', text.content);
        }
        if (text.content && text.content.length > 10000) {
            this.addWarning('VERY_LONG_TEXT', 'Very long text content may impact performance', text, 'content');
        }
    }
    validatePosition(text) {
        if (!Number.isFinite(text.x) || !Number.isFinite(text.y)) {
            this.addError('INVALID_POSITION', 'Text position coordinates must be finite numbers', text, 'x,y', { x: text.x, y: text.y });
        }
    }
    validateTextStyle(text) {
        const style = text.style;
        if (!style)
            return;
        if (style.fontSize !== undefined && style.fontSize <= 0) {
            this.addError('INVALID_FONT_SIZE', 'Font size must be positive', text, 'style.fontSize', style.fontSize);
        }
        if (style.fontSize !== undefined && style.fontSize > 1000) {
            this.addWarning('VERY_LARGE_FONT', 'Very large font size may impact layout', text, 'style.fontSize', style.fontSize);
        }
    }
    checkAccessibility(text) {
        const style = text.style;
        // Check color contrast (simplified)
        if (style?.fill && style.fill === style?.stroke) {
            this.addWarning('LOW_CONTRAST', 'Text fill and stroke colors are the same, may reduce readability', text);
        }
        // Check for very small text
        if (style?.fontSize && style.fontSize < 8) {
            this.addSuggestion('ACCESSIBILITY_IMPROVEMENT', 'Very small text may be hard to read', 'Consider increasing font size for better accessibility', text, 'style.fontSize');
        }
    }
    getResult() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            suggestions: this.suggestions
        };
    }
}
/**
 * Group Element Validator
 */
export class GroupValidator extends BaseElementValidator {
    validate(element, context) {
        this.reset();
        if (element.type !== 'group') {
            this.addError('WRONG_ELEMENT_TYPE', `Expected group element, got ${element.type}`, element);
            return this.getResult();
        }
        const group = element;
        // Validate common properties
        this.validateCommonProperties(group);
        // Validate group-specific properties
        this.validateChildren(group, context);
        this.checkNesting(group, context);
        return this.getResult();
    }
    validateChildren(group, _context) {
        if (!group.children || group.children.length === 0) {
            this.addWarning('EMPTY_GROUP', 'Group element has no children', group, 'children');
        }
        if (group.children && group.children.length > 1000) {
            this.addWarning('LARGE_GROUP', 'Group has many children and may impact performance', group, 'children');
        }
    }
    checkNesting(group, context) {
        // Check for excessive nesting depth
        if (context?.parentElement?.type === 'group') {
            const nestingDepth = 1;
            // This is a simplified check - in a real implementation, you'd track the full parent chain
            if (nestingDepth > 10) {
                this.addWarning('DEEP_NESTING', 'Deep group nesting may impact performance', group);
            }
        }
    }
    getResult() {
        return {
            valid: this.errors.length === 0,
            errors: this.errors,
            warnings: this.warnings,
            suggestions: this.suggestions
        };
    }
}
/**
 * Element Validator Factory
 */
export class ElementValidatorFactory {
    static validators = new Map([
        ['circle', new CircleValidator()],
        ['rect', new RectValidator()],
        ['line', new LineValidator()],
        ['path', new PathValidator()],
        ['text', new TextValidator()],
        ['group', new GroupValidator()]
    ]);
    static getValidator(elementType) {
        return this.validators.get(elementType) || null;
    }
    static validateElement(element, context) {
        const validator = this.getValidator(element.type);
        if (!validator) {
            return {
                valid: false,
                errors: [{
                        code: 'UNKNOWN_ELEMENT_TYPE',
                        message: `Unknown element type: ${element.type}`,
                        element,
                        severity: 'error'
                    }],
                warnings: [],
                suggestions: []
            };
        }
        return validator.validate(element, context);
    }
    static getSupportedElementTypes() {
        return Array.from(this.validators.keys());
    }
}
//# sourceMappingURL=ElementValidators.js.map