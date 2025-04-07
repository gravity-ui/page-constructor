import * as React from 'react';
import {StoreApi} from 'zustand';

import {EditorState} from '../../../../common/store';
import {StoreSyncMessage} from '../../../../common/types';
import {removeFn} from '../../../../common/utils';
import {EditorStore, createEditorStore} from '../../store';
import {IframeContext} from '../iframeContext';

import {MainEditorStoreContext} from './MainEditorStoreContext';

interface MainEditorProviderProps extends React.PropsWithChildren {}

export const MainEditorStoreProvider = ({children}: MainEditorProviderProps) => {
    const {iframeElement} = React.useContext(IframeContext);
    const storeRef = React.useRef<StoreApi<EditorStore>>();

    const sendPostMessage = React.useCallback(
        (data: EditorState) => {
            const message: StoreSyncMessage = {
                state: data,
            };

            if (iframeElement && iframeElement.contentWindow) {
                iframeElement.contentWindow.postMessage(message, '*');
            }
        },
        [iframeElement],
    );

    if (!storeRef.current) {
        storeRef.current = createEditorStore();
    }

    React.useEffect(() => {
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
