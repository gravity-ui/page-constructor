import {useContext, useMemo} from 'react';

import {memoize} from 'lodash';

import {AnalyticsContext} from '../context/analyticsContext';
import {BlockIdContext} from '../context/blockIdContext';
import {AnalyticsEvent, PredefinedEventTypes} from '../models';

export const useAnalytics = (name = '', target?: string) => {
    const {sendEvents, autoEvents} = useContext(AnalyticsContext);
    const context = useContext(BlockIdContext);
    const defaultEvent = useMemo(
        () =>
            name
                ? {
                      name,
                      context,
                      type: PredefinedEventTypes.Default,
                      target: target,
                  }
                : undefined,
        [context, name, target],
    );

    if (!sendEvents) {
        return memoize(() => {});
    }

    const defaultEvents = defaultEvent && autoEvents ? [defaultEvent] : [];

    return memoize(
        (e?: AnalyticsEvent | AnalyticsEvent[] | null, options?: Record<string, string>) => {
            let events: AnalyticsEvent[] = defaultEvents;

            if (e) {
                events = Array.isArray(e) ? [...events, ...e] : [...events, e];
            }

            if (!events) {
                return;
            }

            const preparedEvents = options
                ? events.map((event) => ({
                      ...event,
                      ...options,
                  }))
                : events;

            sendEvents(preparedEvents);
        },
    );
};
