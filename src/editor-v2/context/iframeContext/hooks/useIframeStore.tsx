import {useContext} from 'react';

import {useStore} from 'zustand';

import {IframeContext} from '../iframeContext';

export const useIframeStore = () => {
    const {state} = useContext(IframeContext);
    if (!state) {
        throw new Error('Missing IframeContext');
    }
    return useStore(state);
};

export default useIframeStore;
