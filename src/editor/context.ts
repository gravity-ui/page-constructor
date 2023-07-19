import React from 'react';

import {PageConstructorProps, PageConstructorProviderProps} from '../containers/PageConstructor';

export interface EditorContextType {
    constructorProps?: PageConstructorProps;
    providerProps?: PageConstructorProviderProps;
}

export const EditorContext = React.createContext<Partial<EditorContextType>>({});
