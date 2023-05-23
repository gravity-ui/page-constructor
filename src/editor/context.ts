import React from 'react';

import {EditBlockConstructorProps} from './types';

export interface EditorContextType {
    renderControls?: (props: EditBlockConstructorProps) => JSX.Element;
}

export const EditorContext = React.createContext<EditorContextType>({});
