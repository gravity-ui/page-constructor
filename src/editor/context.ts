import React from 'react';

import {PageConstructorProps, PageConstructorProviderProps} from '../containers/PageConstructor';

export interface EditorContextType {
    data?: PageConstructorProps;
    provider?: PageConstructorProviderProps;
}

export const EditorContext = React.createContext<Partial<EditorContextType>>({});
