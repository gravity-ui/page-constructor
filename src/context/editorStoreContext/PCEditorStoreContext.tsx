import * as React from 'react';

import {StoreApi} from 'zustand';

import {EditorState, createPCEditorStore} from '../../common/store';

export interface PCEditorStoreContextProps {
    state: StoreApi<EditorState>;
}

export const PCEditorStoreContext = React.createContext<PCEditorStoreContextProps>({
    state: createPCEditorStore(),
});
