import {useContext} from 'react';

import {useStore} from 'zustand';

import {PostMessageContext} from '../messagesContext';

export const useMessagesStore = () => {
    const {state} = useContext(PostMessageContext);

    if (!state) {
        throw new Error('Missing PostMessageContext');
    }

    return useStore(state);
};

export default useMessagesStore;
