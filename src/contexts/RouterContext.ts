import React from 'react';

export interface RouterContextProps {
    pathname: string;
    as: string;
    hostname: string;
    query?: {
        [x: string]: string;
    };
}

export const RouterContext = React.createContext<RouterContextProps>({} as RouterContextProps);
