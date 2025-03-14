import * as React from 'react';

import {StoreApi} from 'zustand';

import {EditorState, createPCEditorStore} from '../../../common/store';
import {StoreSyncMessage} from '../../../common/types';

import {PCEditorStoreContext} from './PCEditorStoreContext';

interface PCEditorStoreProviderProps extends React.PropsWithChildren {}

export const PCEditorStoreProvider = ({children}: PCEditorStoreProviderProps) => {
    const storeRef = React.useRef<StoreApi<EditorState>>();

    const syncStore = React.useCallback((message: StoreSyncMessage) => {
        if (storeRef.current && message.state) {
            storeRef.current.setState(message.state);
        }
    }, []);

    React.useEffect(() => {
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
        storeRef.current = createPCEditorStore();
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
