import React, {PropsWithChildren, useCallback, useContext, useEffect, useRef} from 'react';

import {StoreApi} from 'zustand';

import {EditorState, EditorStore, createEditorStore} from '../../../common/store';
import {StoreSyncMessage} from '../../../common/types';
import {removeFn} from '../../../utils/store';
import {IframeContext} from '../iframeContext';

import {MainEditorStoreContext} from './MainEditorStoreContext';

interface MainEditorProviderProps extends PropsWithChildren {}

export const MainEditorStoreProvider = ({children}: MainEditorProviderProps) => {
    const {iframeElement} = useContext(IframeContext);
    const storeRef = useRef<StoreApi<EditorStore>>();

    const sendPostMessage = useCallback(
        (data: EditorState) => {
            const message: StoreSyncMessage = {
                state: data,
            };

            if (iframeElement && iframeElement.contentWindow) {
                iframeElement.contentWindow.postMessage(message, '*');
            } else {
                // eslint-disable-next-line no-console
                console.error('No Iframe element in Editor');
            }
        },
        [iframeElement],
    );

    if (!storeRef.current) {
        storeRef.current = createEditorStore();
    }

    useEffect(() => {
        storeRef.current?.subscribe((state) => {
            sendPostMessage(removeFn(state));
        });
    }, [sendPostMessage]);

    return (
        <MainEditorStoreContext.Provider
            value={{
                state: storeRef.current,
            }}
        >
            {children}
        </MainEditorStoreContext.Provider>
    );
};
