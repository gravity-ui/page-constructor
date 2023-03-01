import {AnalyticsCounters} from '../models';

export const isCounterAllowed = (counter: string, counters?: AnalyticsCounters) => {
    if (!counters) {
        return true;
    }

    if (counters.exclude?.includes(counter)) {
        return false;
    } else if (counters.include?.includes(counter)) {
        return true;
    }

    return false;
};
