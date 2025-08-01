/**
 * Logging utility for the SVG MCP Server
 */
class Logger {
    logLevel;
    constructor(logLevel = 'info') {
        this.logLevel = logLevel;
    }
    shouldLog(level) {
        const levels = {
            debug: 0,
            info: 1,
            warn: 2,
            error: 3,
        };
        return levels[level] >= levels[this.logLevel];
    }
    formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
        if (data !== undefined) {
            return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
        }
        return `${prefix} ${message}`;
    }
    writeLog(level, message, data) {
        if (!this.shouldLog(level)) {
            return;
        }
        const formattedMessage = this.formatMessage(level, message, data);
        switch (level) {
            case 'debug':
                console.debug(formattedMessage);
                break;
            case 'info':
                console.info(formattedMessage);
                break;
            case 'warn':
                console.warn(formattedMessage);
                break;
            case 'error':
                console.error(formattedMessage);
                break;
        }
    }
    debug(message, data) {
        this.writeLog('debug', message, data);
    }
    info(message, data) {
        this.writeLog('info', message, data);
    }
    warn(message, data) {
        this.writeLog('warn', message, data);
    }
    error(message, data) {
        this.writeLog('error', message, data);
    }
    setLogLevel(level) {
        this.logLevel = level;
    }
    getLogLevel() {
        return this.logLevel;
    }
}
// Export a default logger instance
export const logger = new Logger(process.env.LOG_LEVEL || 'info');
//# sourceMappingURL=logger.js.map