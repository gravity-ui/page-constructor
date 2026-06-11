import * as React from 'react';

import {StoreApi} from 'zustand';

import {isValidPostMessage} from '../../common/postMessage';
import {EditorState, createPCEditorStore} from '../../common/store';
import {StoreSyncMessage} from '../../common/types';
import {sendEventPostMessage} from '../../hooks/usePostMessageAPI';

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
            if (!isValidPostMessage(e.data)) {
                return;
            }

            const message = e.data as StoreSyncMessage;
            syncStore(message);
        };

        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, [syncStore]);

    // When Page Constructor runs inside the editor preview iframe, keyboard focus stays in the iframe
    // after clicking the canvas — parent window never receives Cmd+Z. Forward to parent via postMessage.
    React.useEffect(() => {
        if (typeof window === 'undefined' || window.parent === window) {
            return undefined;
        }
        const onKeyDown = (e: KeyboardEvent) => {
            if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'z') {
                return;
            }

            const target = e.target as HTMLElement | null;
            if (target?.closest('input, textarea, select, [contenteditable="true"]')) {
                return;
            }

            e.preventDefault();

            if (e.shiftKey) {
                sendEventPostMessage('ON_EDITOR_REDO', {});
            } else {
                sendEventPostMessage('ON_EDITOR_UNDO', {});
            }
        };
        window.addEventListener('keydown', onKeyDown, true);
        return () => window.removeEventListener('keydown', onKeyDown, true);
    }, []);

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
