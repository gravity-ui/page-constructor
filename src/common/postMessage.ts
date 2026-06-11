import * as React from 'react';

import {POST_MESSAGE_SOURCE} from './constants';
import {ActionMessageTypes, EventMessageTypes, PostMessageAPIMessage} from './types';

export function isValidPostMessage(data: unknown): data is Record<string, unknown> {
    return (
        typeof data === 'object' &&
        data !== null &&
        (data as Record<string, unknown>).source === POST_MESSAGE_SOURCE
    );
}

export function requestActionPostMessage<K extends keyof ActionMessageTypes>(
    action: K,
    data: ActionMessageTypes[K],
    destinationElement: Window,
) {
    const message = {action, data, source: POST_MESSAGE_SOURCE} as PostMessageAPIMessage<K>;
    destinationElement.postMessage(message, '*');
}

export function listenPostMessageEvents<K extends keyof EventMessageTypes>(
    action: K,
    callback: (data: EventMessageTypes[K]) => void,
) {
    const onMessage = (e: MessageEvent) => {
        if (!isValidPostMessage(e.data)) {
            return undefined;
        }

        const message = e.data as PostMessageAPIMessage<K>;
        if (message.action === action) {
            return callback(message.data);
        }

        return undefined;
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
}

export function usePostMessageAPIListener<K extends keyof EventMessageTypes>(
    action: K,
    callback: (data: EventMessageTypes[K]) => void,
    deps: unknown[] = [],
) {
    React.useEffect(() => {
        return listenPostMessageEvents(action, callback);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);
}
