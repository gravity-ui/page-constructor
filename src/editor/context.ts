import * as React from 'react';

import {PageConstructorProps, PageConstructorProviderProps} from '../containers/PageConstructor';
import {Theme} from '../models/common';

import {EditorProps} from './types';

export interface EditorContextType {
    constructorProps?: PageConstructorProps;
    providerProps?: PageConstructorProviderProps;
    deviceEmulationSettings?: EditorProps['deviceEmulationSettings'];
    theme?: Theme;
}

export const EditorContext = React.createContext<Partial<EditorContextType>>({});
