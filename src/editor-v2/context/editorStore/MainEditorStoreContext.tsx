import React from 'react';

import {StoreApi} from 'zustand';

import {EditorStore, createEditorStore} from '../../store';

export interface MainEditorStoreContextProps {
    state: StoreApi<EditorStore>;
}

export const MainEditorStoreContext = React.createContext<MainEditorStoreContextProps>({
    state: createEditorStore(),
});
