import * as React from 'react';

import {AnalyticsEvent} from '../../models';

export type ExtendedEventsConfig = {
    prefix?: string;
    counter?: string;
};

export type AutoEventsConfig = {
    enabled: boolean;
    extendedEvents?: ExtendedEventsConfig;
};

export interface AnalyticsContextProps {
    sendEvents?: (events: AnalyticsEvent[]) => void;
    autoEvents?: boolean | AutoEventsConfig;
}

export const AnalyticsContext = React.createContext<AnalyticsContextProps>({});
