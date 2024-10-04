import React, {PropsWithChildren, useRef} from 'react';

import {StoreApi} from 'zustand';

import {usePostMessage} from '../../common/hooks/usePostMessage';
import {WithStoreReducer} from '../../common/types';
import {useEditorStore} from '../editorContext';

import {PostMessageContext} from './messagesContext';
import {MessagesStore, createMessagesStore} from './store';

export const PostMessageProvider = ({children}: PropsWithChildren) => {
    const storeRef = useRef<StoreApi<MessagesStore>>();

    if (!storeRef.current) {
        storeRef.current = createMessagesStore();
    }

    const editorStore = useEditorStore();

    const storesWithReducer: WithStoreReducer[] = [editorStore];

    const {sendMessage} = usePostMessage({
        subscribers: storeRef.current?.getState().subscribers,
        storesWithReducer,
    });

    return (
        <PostMessageContext.Provider
            value={{
                state: storeRef.current,
                sendMessage: sendMessage,
            }}
        >
            {children}
        </PostMessageContext.Provider>
    );
};
