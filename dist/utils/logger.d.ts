/**
 * Logging utility for the SVG MCP Server
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: unknown;
}
declare class Logger {
    private logLevel;
    constructor(logLevel?: LogLevel);
    private shouldLog;
    private formatMessage;
    private writeLog;
    debug(message: string, data?: unknown): void;
    info(message: string, data?: unknown): void;
    warn(message: string, data?: unknown): void;
    error(message: string, data?: unknown): void;
    setLogLevel(level: LogLevel): void;
    getLogLevel(): LogLevel;
}
export declare const logger: Logger;
export {};
//# sourceMappingURL=logger.d.ts.map