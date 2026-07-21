import * as React from 'react';

import {RouterLinkProps} from '../../components/RouterLink/RouterLink';

export interface History {
    action: 'PUSH' | 'POP' | 'REPLACE' | '';

    replace(location: Partial<Location>): void;

    push(location: Partial<Location>): void;

    goBack(): void;

    length: number;
}

export type RouterLink =
    | React.ComponentClass<RouterLinkProps>
    | ((props: RouterLinkProps) => React.ReactNode);

export type LocationContextProps = {
    history?: History;
    search?: string;
    hash?: string;
    pathname?: string;
    hostname?: string;
    Link?: RouterLink;
    asPath?: string;
};

export const initialLocation: LocationContextProps = {};

const isRscServer = typeof React.createContext !== 'function';

export const LocationContext = (
    isRscServer ? null : React.createContext<LocationContextProps>(initialLocation)
) as React.Context<LocationContextProps>;
