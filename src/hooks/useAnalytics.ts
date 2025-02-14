import {useContext, useMemo} from 'react';

import {AnalyticsContext} from '../context/analyticsContext';
import {BlockIdContext} from '../context/blockIdContext';
import {AnalyticsEvent, AnalyticsEventsProp, PredefinedEventTypes} from '../models';

export const useAnalytics = (name = '', target?: string) => {
    const {sendEvents, autoEvents} = useContext(AnalyticsContext);
    const context = useContext(BlockIdContext);
    const defaultEvent = useMemo(
        () =>
            name
                ? {
                      name,
                      context: String(context),
                      type: PredefinedEventTypes.Default,
                      target: target,
                  }
                : undefined,
        [context, name, target],
    );

    if (!sendEvents) {
        return () => {};
    }

    const defaultEvents = defaultEvent && autoEvents ? [defaultEvent] : [];

    return (e?: AnalyticsEventsProp | null, additionalContext?: Record<string, string>) => {
        let events: AnalyticsEvent[] = defaultEvents;

        if (e) {
            events = Array.isArray(e) ? [...events, ...e] : [...events, e];
        }

        if (!events) {
            return;
        }

        const preparedEvents = additionalContext
            ? events.map((event) => ({
                  ...event,
                  ...additionalContext,
              }))
            : events;

        sendEvents(preparedEvents);
    };
};
