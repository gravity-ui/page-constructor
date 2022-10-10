import React from 'react';
import {RouterLinkProps} from '../../components/RouterLink/RouterLink';
import {WithChildren} from '../../models';

export interface History {
    action: 'PUSH' | 'POP' | 'REPLACE' | '';

    replace(location: Partial<Location>): void;

    push(location: Partial<Location>): void;

    goBack(): void;

    length: number;
}

export type RouterLink =
    | React.ComponentClass<RouterLinkProps>
    | React.FC<WithChildren<RouterLinkProps>>;

export type LocationContextProps = {
    history?: History;
    search?: string;
    hash?: string;
    pathname?: string;
    hostname?: string;
    Link?: RouterLink;
};

export const LocationContext = React.createContext<LocationContextProps>({});
