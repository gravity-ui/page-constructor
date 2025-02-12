import * as React from 'react';

import {MapsContext, MapsContextType} from './mapsContext';

export function useMapApiKey(): [MapsContextType['apiKey'], MapsContextType['setKey']] {
    const {apiKey, setKey} = React.useContext(MapsContext);
    return [apiKey, setKey];
}
