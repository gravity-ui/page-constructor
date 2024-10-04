import React, {PropsWithChildren, useCallback, useEffect, useRef} from 'react';

import {StoreApi} from 'zustand';

import {WithStoreReducer} from '../../types';
import {Action} from '../../types/actions';
import {useEditorStore} from '../editorContext';

import {PostMessageContext} from './messagesContext';
import {MessagesStore, createMessagesStore} from './store';
import {Meta, MetaSource, PostMessageArgs, SendOptions} from './types';

const DEBUG_MODE = false;

export const PostMessageProvider = ({children}: PropsWithChildren) => {
    const storeRef = useRef<StoreApi<MessagesStore>>();

    if (!storeRef.current) {
        storeRef.current = createMessagesStore();
    }

    const editorStore = useEditorStore();

    const sendPostMessage = useCallback((args: PostMessageArgs) => {
        window.parent.postMessage(args, '*');
    }, []);

    const notifySubscribers = useCallback(
        (action: Action, source: MetaSource) => {
            const meta: Meta = {source};
            const storesWithReducer: WithStoreReducer[] = [editorStore];

            const {type, payload} = action;
            const store = storeRef.current;

            if (!type) {
                return;
            }

            if (store) {
                const {subscribers} = store.getState();
                const foundedSubscribers = subscribers.filter(
                    (subscriber) => subscriber.action === type,
                );

                for (const storeWithReducer of storesWithReducer) {
                    storeWithReducer.reducer(action, meta);
                }

                if (foundedSubscribers.length) {
                    for (const subscriber of foundedSubscribers) {
                        subscriber.handler(payload, meta);
                    }
                }
            }
        },
        [editorStore],
    );

    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            const {action, debug}: PostMessageArgs = e.data;

            if (action && action.type) {
                if (debug) {
                    // eslint-disable-next-line no-console
                    console.log(`🔵 ➡️ Editor ${action.type}`, action.payload);
                }
                notifySubscribers(action, 'editor');
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [notifySubscribers]);

    const sendMessage = useCallback(
        (action: Action, {debug = DEBUG_MODE, direction = 'both'}: SendOptions = {}) => {
            if (debug) {
                // eslint-disable-next-line no-console
                console.log(`🟢 Website ➡️ ${action.type}`, action.payload);
            }

            if (direction === 'both' || direction === 'editor') {
                sendPostMessage({action, debug});
            }
            if (direction === 'both' || direction === 'pc') {
                notifySubscribers(action, 'pc');
            }
        },
        [notifySubscribers, sendPostMessage],
    );

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
