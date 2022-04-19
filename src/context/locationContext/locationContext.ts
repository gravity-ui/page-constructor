import React from 'react';
import {RouterLinkProps} from '../../components/RouterLink/RouterLink';
import {History} from '../mobileAppContext';

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
