import React from 'react';
import {History} from '../mobileAppContext';

export type LocationContextProps = {
    history?: History;
    search?: string;
    hash?: string;
    pathname?: string;
    hostname?: string;
};

export const LocationContext = React.createContext<LocationContextProps>({});
