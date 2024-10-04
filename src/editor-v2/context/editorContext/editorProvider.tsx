import React, {PropsWithChildren, useRef} from 'react';

import {StoreApi} from 'zustand';

import {EditorContext} from './editorContext';
import {EditorStore, createEditorStore} from './store';

export const EditorProvider = ({children}: PropsWithChildren) => {
    const storeRef = useRef<StoreApi<EditorStore>>();

    if (!storeRef.current) {
        storeRef.current = createEditorStore();
    }

    return (
        <EditorContext.Provider value={{state: storeRef.current}}>
            {children}
        </EditorContext.Provider>
    );
};
