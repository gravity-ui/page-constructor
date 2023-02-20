import React from 'react';
import {AnalyticsEvent} from '../../models';

export interface AnalyticsContextProps {
    sendEvents?: (events: AnalyticsEvent[]) => void;
    autoEvents?: boolean;
}

export const AnalyticsContext = React.createContext<AnalyticsContextProps>({});
