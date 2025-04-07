import * as React from 'react';
import {useStore} from 'zustand';

import {MainEditorStoreContext} from '../context/editorStore';

export const useMainEditorStore = () => {
    const {state} = React.useContext(MainEditorStoreContext);
    return useStore(state);
};
