import React, {PropsWithChildren, useState} from 'react';

import {IframeContext} from './iframeContext';

interface IframeProviderProps extends PropsWithChildren {
    initialUrl?: string;
    disableUrlField?: boolean;
}

export const IframeProvider = (props: IframeProviderProps) => {
    const {children, initialUrl = '', disableUrlField} = props;
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
