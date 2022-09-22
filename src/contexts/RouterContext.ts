import React from 'react';
import {Query} from '../models/common';

export interface RouterContextProps {
    pathname: string;
    as: string;
    hostname: string;
    query?: Query;
}

export const RouterContext = React.createContext<RouterContextProps>({} as RouterContextProps);
