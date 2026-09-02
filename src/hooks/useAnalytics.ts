import * as React from 'react';

import {AnalyticsContext} from '../context/analyticsContext';
import {BlockIdContext} from '../context/blockIdContext';
import {AnalyticsEvent, AnalyticsEventsProp, PredefinedEventTypes} from '../models';

const normalizeEvents = (events?: AnalyticsEventsProp | null): AnalyticsEvent[] => {
    if (!events) {
        return [];
    }

    if (Array.isArray(events)) {
        return events;
    }

    return [events];
};

export const useAnalytics = (name = '', target?: string) => {
    const {sendEvents, autoEvents} = React.useContext(AnalyticsContext);
    const context = React.useContext(BlockIdContext);
    const autoEventsConfig = typeof autoEvents === 'boolean' ? {enabled: autoEvents} : autoEvents;
    const defaultEvent = React.useMemo(
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
        return () => {};
    }

    const defaultEvents = defaultEvent && autoEventsConfig?.enabled ? [defaultEvent] : [];
    const extendedEventsConfig = autoEventsConfig?.extendedEvents;

    return (
        analyticsEvent?: AnalyticsEventsProp | null,
        additionalContext?: Record<string, string>,
    ) => {
        const suppliedEvents = normalizeEvents(analyticsEvent);
        const preparedSuppliedEvents = suppliedEvents.flatMap((event) => {
            if (event.type !== PredefinedEventTypes.Extended) {
                return [event];
            }

            if (!extendedEventsConfig) {
                return [];
            }

            return [
                {
                    ...event,
                    name: `${extendedEventsConfig.prefix || ''}${event.name}`,
                    ...(extendedEventsConfig.counter
                        ? {counters: {include: [extendedEventsConfig.counter]}}
                        : {}),
                },
            ];
        });
        const events: AnalyticsEvent[] = [...defaultEvents, ...preparedSuppliedEvents];

        if (!events.length) {
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
