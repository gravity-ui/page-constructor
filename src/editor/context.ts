import React from 'react';

import {EditBlockConstructorProps} from './types';

export interface EditorContextType {
    renderEditControls?: (props: EditBlockConstructorProps) => JSX.Element;
}

export const EditorContext = React.createContext<EditorContextType>({});
