import * as React from 'react';

import {MapType, MapsContext} from './mapsContext';

interface MapProviderProps {
    type: MapType;
    scriptSrc: string;
    apiKey?: string;
}

export const gmapApiKeyIdInLS = 'gmap-api-key';

export const MapProvider: (props: React.PropsWithChildren<MapProviderProps>) => React.ReactNode = ({
    type = MapType.Yandex,
    scriptSrc,
    apiKey,
    children,
}) => {
    const initialKeyValue =
        type === MapType.Google
            ? apiKey || localStorage.getItem(gmapApiKeyIdInLS) || ''
            : apiKey || '';
    const [currentApiKey, setKey] = React.useState(initialKeyValue);

    return (
        <MapsContext.Provider value={{apiKey: currentApiKey, setKey, scriptSrc, type}}>
            {children}
        </MapsContext.Provider>
    );
};
