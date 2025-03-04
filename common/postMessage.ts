import {useEffect} from 'react';

import {ActionMessageTypes, EventMessageTypes, PostMessageAPIMessage} from './types';

export function requestActionPostMessage<K extends keyof ActionMessageTypes>(
    action: K,
    data: ActionMessageTypes[K],
    destinationElement: Window,
) {
    const message = {action, data} as PostMessageAPIMessage<K>;
    destinationElement.postMessage(message);
}

export function listenPostMessageEvents<K extends keyof EventMessageTypes>(
    action: K,
    callback: (data: EventMessageTypes[K]) => void,
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

export function usePostMessageAPIListener<K extends keyof EventMessageTypes>(
    action: K,
    callback: (data: EventMessageTypes[K]) => void,
    deps: unknown[] = [],
) {
    useEffect(() => {
        return listenPostMessageEvents(action, callback);
    }, [...deps]);
}
