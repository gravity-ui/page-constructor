import React from 'react';
import {Query} from '../models/common';
// @ts-ignore
import {EventEmitter} from '../utils/eventEmmiter';

export interface RouterContextProps {
    page: string;
    pathname: string;
    query: Query;
    hash?: string;
    as: string;
    hostname: string;
    events?: EventEmitter;
}

export const RouterContext = React.createContext<RouterContextProps>({} as RouterContextProps);
