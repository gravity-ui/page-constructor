/**
 * Context for iframe window
 **/

import React from 'react';

import {StoreApi} from 'zustand';

import {IframeStore} from './store';

export interface IframeContextProps {
    state?: StoreApi<IframeStore>;
    iframeElement?: HTMLIFrameElement;
    setIframeElement: (element: HTMLIFrameElement) => void;
    disableUrlField?: boolean;
}

export const IframeContext = React.createContext<IframeContextProps>({setIframeElement: () => {}});
