import * as React from 'react';

import {PostMessageAPIMessage} from '../common/types';
import {ActionMessageTypes, EventMessageTypes} from '../common/types/actions';

export function sendEventPostMessage<K extends keyof EventMessageTypes>(
    action: K,
    data: EventMessageTypes[K],
) {
    const message = {action, data} as PostMessageAPIMessage<K>;
    window.parent.postMessage(message);
}

export function listenPostMessageActions<K extends keyof ActionMessageTypes>(
    action: K,
    callback: (data: ActionMessageTypes[K]) => void,
) {
    const onMessage = (e: MessageEvent) => {
        const message = e.data as PostMessageAPIMessage<K>;

        if ('action' in message && message.action === action) {
            return callback(message.data);
        }

        return undefined;
    };

    window.addEventListener('message', onMessage);

    return () => {
        window.removeEventListener('message', onMessage);
    };
}

export function useInternalPostMessageAPIListener<K extends keyof ActionMessageTypes>(
    action: K,
    callback: (data: ActionMessageTypes[K]) => void,
) {
    React.useEffect(() => {
        return listenPostMessageActions(action, callback);
    }, [action, callback]);
}
