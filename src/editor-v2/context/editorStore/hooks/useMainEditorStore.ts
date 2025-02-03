import {useContext} from 'react';

import {useStore} from 'zustand';

import {MainEditorStoreContext} from '../MainEditorStoreContext';

export const useMainEditorStore = () => {
    const {state} = useContext(MainEditorStoreContext);
    return useStore(state);
};
