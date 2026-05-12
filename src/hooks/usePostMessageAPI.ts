import * as React from 'react';

import {POST_MESSAGE_SOURCE} from '../common/constants';
import {isValidPostMessage} from '../common/postMessage';
import {PostMessageAPIMessage} from '../common/types';
import {ActionMessageTypes, EventMessageTypes} from '../common/types/actions';

export function sendEventPostMessage<K extends keyof EventMessageTypes>(
    action: K,
    data: EventMessageTypes[K],
) {
    const message = {action, data, source: POST_MESSAGE_SOURCE} as PostMessageAPIMessage<K>;
    window.parent.postMessage(message, '*');
}

export function listenPostMessageActions<K extends keyof ActionMessageTypes>(
    action: K,
    callback: (data: ActionMessageTypes[K]) => void,
) {
    const onMessage = (e: MessageEvent) => {
        if (!isValidPostMessage(e.data)) {
            return;
        }

        const message = e.data as PostMessageAPIMessage<K>;
        if (message.action === action) {
            callback(message.data);
        }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
}

export function useInternalPostMessageAPIListener<K extends keyof ActionMessageTypes>(
    action: K,
    callback: (data: ActionMessageTypes[K]) => void,
) {
    React.useEffect(() => {
        return listenPostMessageActions(action, callback);
    }, [action, callback]);
}
