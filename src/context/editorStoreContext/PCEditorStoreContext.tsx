import React from 'react';

import {StoreApi} from 'zustand';

import {EditorStore, createEditorStore} from '../../common/store';

export interface PCEditorStoreContextProps {
    state: StoreApi<EditorStore>;
}

export const PCEditorStoreContext = React.createContext<PCEditorStoreContextProps>({
    state: createEditorStore(),
});
