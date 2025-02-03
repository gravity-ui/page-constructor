import React, {PropsWithChildren, useCallback, useEffect, useRef} from 'react';

import {StoreApi} from 'zustand';

import {EditorStore, createEditorStore} from '../../common/store';
import {StoreSyncMessage} from '../../common/types';

import {PCEditorStoreContext} from './PCEditorStoreContext';

interface PCEditorStoreProviderProps extends PropsWithChildren {}

export const PCEditorStoreProvider = ({children}: PCEditorStoreProviderProps) => {
    const storeRef = useRef<StoreApi<EditorStore>>();

    const syncStore = useCallback((message: StoreSyncMessage) => {
        if (storeRef.current && message.state) {
            storeRef.current.setState(message.state);
        }
    }, []);

    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            const message = e.data as StoreSyncMessage;
            syncStore(message);
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [syncStore]);

    if (!storeRef.current) {
        storeRef.current = createEditorStore();
    }

    return (
        <PCEditorStoreContext.Provider
            value={{
                state: storeRef.current,
            }}
        >
            {children}
        </PCEditorStoreContext.Provider>
    );
};
