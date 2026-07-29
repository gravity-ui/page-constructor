import * as React from 'react';

import {IframeContext} from './IframeContext';

interface IframeProviderProps extends React.PropsWithChildren {
    initialUrl?: string;
    disableUrlField?: boolean;
    hideUrl?: boolean;
}

export const IframeProvider = ({
    children,
    initialUrl = '',
    disableUrlField,
    hideUrl,
}: IframeProviderProps) => {
    const [iframeElement, setIframeElement] = React.useState<HTMLIFrameElement>();
    const [url, setUrl] = React.useState(initialUrl);

    const setIframeElementFunc = (element: HTMLIFrameElement) => setIframeElement(element);

    return (
        <IframeContext.Provider
            value={{
                url,
                setUrl,
                iframeElement,
                setIframeElement: setIframeElementFunc,
                disableUrlField,
                hideUrl,
            }}
        >
            {children}
        </IframeContext.Provider>
    );
};
