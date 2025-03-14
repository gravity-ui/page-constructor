/**
 * Context for iframe window
 **/

import * as React from 'react';

export interface IframeContextProps {
    iframeElement?: HTMLIFrameElement;
    setIframeElement: (element: HTMLIFrameElement) => void;
    url: string;
    setUrl: (url: string) => void;
    disableUrlField?: boolean;
}

export const IframeContext = React.createContext<IframeContextProps>({
    setIframeElement: () => {},
    setUrl: () => {},
    url: '',
});
