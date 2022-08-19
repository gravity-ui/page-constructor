/* eslint-disable no-console */
const showLogs = typeof __ENV__ === 'string' ? __ENV__ === 'testing' : true;

function getMessagePrefix(namespace?: string) {
    if (namespace) {
        return `[${namespace}] `;
    }

    return '';
}

export type LogFunction = (msg: string) => void;

export interface Logger {
    log: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
}

export function createLogger(namespace?: string): Logger {
    const msgPrefix = getMessagePrefix(namespace);

    return {
        log(msg: string) {
            if (showLogs) {
                console.log(msgPrefix + msg);
            }
        },
        info(msg: string) {
            if (showLogs) {
                console.info(msgPrefix + msg);
            }
        },
        warn(msg: string) {
            if (showLogs) {
                console.warn(msgPrefix + msg);
            }
        },
        error(msg: string) {
            console.error(msgPrefix + msg);
        },
    };
}

export default createLogger();
