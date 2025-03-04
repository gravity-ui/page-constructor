import React, {PropsWithChildren, useState} from 'react';

import {IframeContext} from './IframeContext';

interface IframeProviderProps extends PropsWithChildren {
    initialUrl?: string;
    disableUrlField?: boolean;
}

export const IframeProvider = ({
    children,
    initialUrl = '',
    disableUrlField,
}: IframeProviderProps) => {
    const [iframeElement, setIframeElement] = useState<HTMLIFrameElement>();
    const [url, setUrl] = useState(initialUrl);

    const setIframeElementFunc = (element: HTMLIFrameElement) => setIframeElement(element);

    return (
        <IframeContext.Provider
            value={{
                url,
                setUrl,
                iframeElement,
                setIframeElement: setIframeElementFunc,
                disableUrlField,
            }}
        >
            {children}
        </IframeContext.Provider>
    );
};
