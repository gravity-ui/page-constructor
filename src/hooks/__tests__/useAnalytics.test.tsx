import * as React from 'react';

import {act, renderHook} from '@testing-library/react';

import {
    AnalyticsContext,
    AnalyticsContextProps,
} from '../../context/analyticsContext/analyticsContext';
import {BlockIdContext} from '../../context/blockIdContext/blockIdContext';
import {AnalyticsEvent, PredefinedEventTypes} from '../../models/common';
import {useAnalytics} from '../useAnalytics';

type RenderUseAnalyticsOptions = {
    analytics: AnalyticsContextProps;
    context?: string;
    name?: string;
    target?: string;
};

const renderUseAnalytics = ({
    analytics,
    context = 'Banner-0',
    name = 'button-click',
    target = '/target',
}: RenderUseAnalyticsOptions) => {
    const wrapper = ({children}: React.PropsWithChildren) => (
        <AnalyticsContext.Provider value={analytics}>
            <BlockIdContext.Provider value={context}>{children}</BlockIdContext.Provider>
        </AnalyticsContext.Provider>
    );

    return renderHook(() => useAnalytics(name, target), {wrapper});
};

describe('useAnalytics', () => {
    test.each([true, {enabled: true}])(
        'emits an unchanged default event for autoEvents: %p',
        (autoEvents) => {
            const sendEvents = jest.fn();
            const {result} = renderUseAnalytics({analytics: {sendEvents, autoEvents}});

            act(() => result.current());

            expect(sendEvents).toHaveBeenCalledWith([
                {
                    name: 'button-click',
                    type: PredefinedEventTypes.Default,
                    context: 'Banner-0',
                    target: '/target',
                },
            ]);
        },
    );

    test.each([false, {enabled: false}])(
        'suppresses the default event for autoEvents: %p',
        (autoEvents) => {
            const sendEvents = jest.fn();
            const {result} = renderUseAnalytics({analytics: {sendEvents, autoEvents}});

            act(() => result.current());

            expect(sendEvents).not.toHaveBeenCalled();
        },
    );

    test('emits an extended event independently of default events', () => {
        const sendEvents = jest.fn();
        const {result} = renderUseAnalytics({
            analytics: {sendEvents, autoEvents: {enabled: false, extendedEvents: {}}},
        });

        act(() =>
            result.current({
                name: 'registered-click',
                type: PredefinedEventTypes.Extended,
            }),
        );

        expect(sendEvents).toHaveBeenCalledWith([
            {name: 'registered-click', type: PredefinedEventTypes.Extended},
        ]);
    });

    test('decorates only extended events and preserves event ordering', () => {
        const sendEvents = jest.fn();
        const {result} = renderUseAnalytics({
            analytics: {
                sendEvents,
                autoEvents: {
                    enabled: true,
                    extendedEvents: {prefix: ' Library prefix: ', counter: 'secondary'},
                },
            },
        });
        const extendedEvent: AnalyticsEvent<{customField: string}> = {
            name: 'registered-click',
            type: PredefinedEventTypes.Extended,
            counters: {exclude: ['legacy']},
            customField: 'preserved',
        };
        const customEvent: AnalyticsEvent<{customField: string}> = {
            name: 'custom-click',
            type: 'consumer-event',
            counters: {exclude: ['secondary']},
            customField: 'unchanged',
        };

        act(() => result.current([extendedEvent, customEvent]));

        expect(sendEvents).toHaveBeenCalledWith([
            {
                name: 'button-click',
                type: PredefinedEventTypes.Default,
                context: 'Banner-0',
                target: '/target',
            },
            {
                name: ' Library prefix: registered-click',
                type: PredefinedEventTypes.Extended,
                counters: {include: ['secondary']},
                customField: 'preserved',
            },
            customEvent,
        ]);
    });

    test('does not decorate supplied default, play, or stop events', () => {
        const sendEvents = jest.fn();
        const {result} = renderUseAnalytics({
            analytics: {
                sendEvents,
                autoEvents: {
                    enabled: false,
                    extendedEvents: {prefix: 'prefix-', counter: 'counter'},
                },
            },
        });
        const events: AnalyticsEvent[] = [
            {name: 'supplied-default', type: PredefinedEventTypes.Default},
            {name: 'play', type: PredefinedEventTypes.Play},
            {name: 'stop', type: PredefinedEventTypes.Stop},
        ];

        act(() => result.current(events));

        expect(sendEvents).toHaveBeenCalledWith(events);
    });

    test('applies additionalContext to every emitted event after preparation', () => {
        const sendEvents = jest.fn();
        const {result} = renderUseAnalytics({
            analytics: {
                sendEvents,
                autoEvents: {enabled: true, extendedEvents: {prefix: 'prefix-'}},
            },
        });

        act(() =>
            result.current(
                [{name: 'extended', type: PredefinedEventTypes.Extended}, {name: 'custom'}],
                {context: 'overridden-context', source: 'additional'},
            ),
        );

        expect(sendEvents).toHaveBeenCalledWith([
            {
                name: 'button-click',
                type: PredefinedEventTypes.Default,
                context: 'overridden-context',
                target: '/target',
                source: 'additional',
            },
            {
                name: 'prefix-extended',
                type: PredefinedEventTypes.Extended,
                context: 'overridden-context',
                source: 'additional',
            },
            {name: 'custom', context: 'overridden-context', source: 'additional'},
        ]);
    });

    test('omits extended events when extendedEvents configuration is absent', () => {
        const sendEvents = jest.fn();
        const {result} = renderUseAnalytics({
            analytics: {sendEvents, autoEvents: {enabled: false}},
        });

        act(() => result.current({name: 'extended', type: PredefinedEventTypes.Extended}));

        expect(sendEvents).not.toHaveBeenCalled();
    });

    test('returns a safe no-op handler when sendEvents is absent', () => {
        const {result} = renderUseAnalytics({
            analytics: {
                autoEvents: {enabled: true, extendedEvents: {prefix: 'prefix-'}},
            },
        });

        expect(() =>
            act(() => result.current({name: 'extended', type: PredefinedEventTypes.Extended})),
        ).not.toThrow();
    });

    test('does not call sendEvents with an empty array', () => {
        const sendEvents = jest.fn();
        const {result} = renderUseAnalytics({analytics: {sendEvents}, name: ''});

        act(() => result.current([]));

        expect(sendEvents).not.toHaveBeenCalled();
    });
});
