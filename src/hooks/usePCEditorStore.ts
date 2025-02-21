import {useContext} from 'react';

import {useStore} from 'zustand';

import {PCEditorStoreContext} from '../context/editorStoreContext';

export const usePCEditorStore = () => {
    const {state} = useContext(PCEditorStoreContext);
    return useStore(state);
};
