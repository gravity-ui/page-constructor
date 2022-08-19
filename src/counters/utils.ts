import {Logger} from 'utils/logger';

export enum MetrikaCounter {
    Main = 'main',
    CrossSite = 'cross-site',
    Scale = 'scale',
}

const warnShown: Record<string, boolean> = {};

export const getWarnOnce = (logger: Logger) =>
    function (name: string) {
        if (!warnShown[name]) {
            logger.warn(`Counter "${name}" hasn't been initialized`);
            warnShown[name] = true;
        }
    };

export async function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
