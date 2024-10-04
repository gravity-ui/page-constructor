import {useContext} from 'react';

import {useStore} from 'zustand';

import {EditorContext} from '../editorContext';

export const useEditorStore = () => {
    const {state} = useContext(EditorContext);

    if (!state) {
        throw new Error('Missing EditorContext');
    }

    return useStore(state);
};

export default useEditorStore;
