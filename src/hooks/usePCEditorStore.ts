import * as React from 'react';

import {useStore} from 'zustand';

import {PCEditorStoreContext} from '../context/editorStoreContext';

export const usePCEditorStore = () => {
    const {state} = React.useContext(PCEditorStoreContext);
    return useStore(state);
};
