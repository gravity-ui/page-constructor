import React, {PropsWithChildren, useRef, useState} from 'react';

import {StoreApi} from 'zustand';

import {EditorContext} from './editorContext';
import {EditorStore, createEditorStore} from './store';

export const EditorProvider: React.FC<PropsWithChildren> = ({children}) => {
    const storeRef = useRef<StoreApi<EditorStore>>();
    const [activeElement, setActiveElement] = useState<HTMLElement | undefined>();

    if (!storeRef.current) {
        storeRef.current = createEditorStore();
    }

    return (
        <EditorContext.Provider
            value={{
                state: storeRef.current,
                activeElement: activeElement,
                setActiveElement: setActiveElement,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};
