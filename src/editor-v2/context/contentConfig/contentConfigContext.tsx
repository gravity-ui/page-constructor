/**
 * Context for managing PC configuration (aka Yaml Configs)
 **/

import React from 'react';

import {StoreApi} from 'zustand';

import {ContentConfigStore} from './store';

export interface ContentConfigContextProps {
    state?: StoreApi<ContentConfigStore>;
}

export const ContentConfigContext = React.createContext<ContentConfigContextProps>({});
