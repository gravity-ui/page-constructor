import React from 'react';

export interface RouterContextProps {
    pathname: string;
    as: string;
    hostname: string;
}

export const RouterContext = React.createContext<RouterContextProps>({} as RouterContextProps);
