import React from 'react';

import {PageConstructorProps, PageConstructorProviderProps} from '../containers/PageConstructor';

import {EditorProps} from './types';

export interface EditorContextType {
    constructorProps?: PageConstructorProps;
    providerProps?: PageConstructorProviderProps;
    deviceEmulationSettings?: EditorProps['deviceEmulationSettings'];
}

export const EditorContext = React.createContext<Partial<EditorContextType>>({});
