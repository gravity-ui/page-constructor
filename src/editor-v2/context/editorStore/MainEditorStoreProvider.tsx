import * as React from 'react';

import {StoreApi} from 'zustand';

import {POST_MESSAGE_SOURCE} from '../../../common/constants';
import {EditorState} from '../../../common/store';
import {StoreSyncMessage} from '../../../common/types';
import {removeFn} from '../../../common/utils';
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
                source: POST_MESSAGE_SOURCE,
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
            const {historyPast: _historyPast, historyFuture: _historyFuture, ...syncable} = state;
            sendPostMessage(removeFn({...syncable, historyPast: [], historyFuture: []}));
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
