import {useContext} from 'react';

import {useStore} from 'zustand';

import {ContentConfigContext} from '../contentConfigContext';

export const useContentConfigStore = () => {
    const {state} = useContext(ContentConfigContext);
    if (!state) {
        throw new Error('Missing ContentConfigContext');
    }
    return useStore(state);
};

export default useContentConfigStore;
