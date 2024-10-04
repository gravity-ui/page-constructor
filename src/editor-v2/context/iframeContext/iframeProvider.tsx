import React, {PropsWithChildren, useRef, useState} from 'react';

import {StoreApi} from 'zustand';

import {IframeContext} from './iframeContext';
import {IframeStore, createIframeStore} from './store';

interface IframeProviderProps extends PropsWithChildren {
    initialUrl?: string;
    disableUrlField?: boolean;
}

export const IframeProvider = (props: IframeProviderProps) => {
    const {children, initialUrl, disableUrlField} = props;
    const storeRef = useRef<StoreApi<IframeStore>>();
    const [iframeElement, setIframeElement] = useState<HTMLIFrameElement>();

    const setIframeElementFunc = (element: HTMLIFrameElement) => setIframeElement(element);

    if (!storeRef.current) {
        storeRef.current = createIframeStore({url: initialUrl});
    }

    return (
        <IframeContext.Provider
            value={{
                state: storeRef.current,
                iframeElement,
                setIframeElement: setIframeElementFunc,
                disableUrlField,
            }}
        >
            {children}
        </IframeContext.Provider>
    );
};
