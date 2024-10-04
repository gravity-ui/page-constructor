import {useContext, useEffect} from 'react';

import {ActionTypes, IframeReadyAction} from '../../../../common/types';
import {ContentConfigContext, useContentConfigStore} from '../../../context/contentConfig';
import {useEditorStore} from '../../../context/editorContext';
import {useMessageObserver, useMessageSender} from '../../../context/messagesContext';

const useAdminInitialize = () => {
    const {state: contentConfigState} = useContext(ContentConfigContext);
    const {config} = useContentConfigStore();
    const {initialized} = useEditorStore();
    const sendMessage = useMessageSender();

    useMessageObserver<IframeReadyAction>(
        ActionTypes.IframeReady,
        () => {
            if (sendMessage && !initialized) {
                sendMessage({type: ActionTypes.EditorReady, payload: undefined});
                sendMessage(
                    {type: ActionTypes.UpdateConfigs, payload: {content: config}},
                    {direction: 'pc'},
                );
            }
        },
        [sendMessage],
    );

    // Update configs for both instances on any changes
    useEffect(
        () =>
            contentConfigState &&
            contentConfigState.subscribe((state) => {
                sendMessage({type: ActionTypes.UpdateConfigs, payload: {content: state.config}});
            }),
        [sendMessage, contentConfigState],
    );
};

export default useAdminInitialize;
