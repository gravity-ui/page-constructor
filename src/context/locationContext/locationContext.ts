import React from 'react';
import {History} from '../mobileAppContext';

export interface RouterLinkProps {
    href: string;
}

export type RouterLink = React.ComponentClass<RouterLinkProps>;

export type LocationContextProps = {
    history?: History;
    search?: string;
    hash?: string;
    pathname?: string;
    hostname?: string;
    Link?: RouterLink;
};

export const LocationContext = React.createContext<LocationContextProps>({});
