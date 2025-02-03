import {useContext} from 'react';

import {useStore} from 'zustand';

import {PCEditorStoreContext} from '../PCEditorStoreContext';

export const usePCEditorStore = () => {
    const {state} = useContext(PCEditorStoreContext);
    return useStore(state);
};
