import React, {PropsWithChildren, useContext, useRef} from 'react';

import {StoreApi} from 'zustand';

import {usePostMessage} from '../../../common/hooks/usePostMessage';
import {WithStoreReducer} from '../../../common/types';
import {getUrlOrigin} from '../../utils';
import {useContentConfigStore} from '../contentConfig/hooks/useContentConfigStore';
import {useEditorStore} from '../editorContext/hooks/useEditorStore';
import {IframeContext, useIframeStore} from '../iframeContext';

import {PostMessageContext} from './messagesContext';
import {MessagesStore, createMessagesStore} from './store';

export const PostMessageProvider = ({children}: PropsWithChildren) => {
    const storeRef = useRef<StoreApi<MessagesStore>>();
    const {iframeElement} = useContext(IframeContext);

    const contentConfigStore = useContentConfigStore();
    const editorStore = useEditorStore();
    const iframeStore = useIframeStore();

    if (!storeRef.current) {
        storeRef.current = createMessagesStore();
    }

    const storesWithReducer: WithStoreReducer[] = [contentConfigStore, editorStore, iframeStore];

    const {sendMessage} = usePostMessage({
        subscribers: storeRef.current?.getState().subscribers,
        storesWithReducer,
        targetIframeElement: iframeElement,
        urlOrigin: getUrlOrigin(iframeStore.url),
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
