import {useCallback, useEffect} from 'react';

import {
    Action,
    Meta,
    MetaSource,
    PostMessageArgs,
    SendOptions,
    Subscriber,
    WithStoreReducer,
} from '../../common/types';

interface UsePostMessageProps {
    subscribers: Subscriber[];
    storesWithReducer: WithStoreReducer[];
    targetIframeElement?: HTMLIFrameElement;
    urlOrigin?: string;
}

// TODO: enable/disable via env variables
const DEBUG_MODE = false;

export const usePostMessage = (props: UsePostMessageProps) => {
    const {subscribers, storesWithReducer, targetIframeElement, urlOrigin} = props;

    const metaSource: MetaSource = targetIframeElement ? 'editor' : 'pc';
    const receiveMetaSource: MetaSource = targetIframeElement ? 'pc' : 'editor';

    const notifySubscribers = useCallback(
        (action: Action, source: MetaSource) => {
            const meta: Meta = {source};

            const {type, payload} = action;

            if (!type) {
                return;
            }

            if (subscribers) {
                const foundedSubscribers = subscribers.filter(
                    (subscriber) => subscriber.action === type,
                );

                for (const storeWithReducer of storesWithReducer) {
                    storeWithReducer.reducer(action, meta);
                }

                if (foundedSubscribers.length) {
                    for (const subscriber of foundedSubscribers) {
                        subscriber.handler(payload, meta);
                    }
                }
            }
        },
        [storesWithReducer, subscribers],
    );

    const sendPostMessage = useCallback(
        (args: PostMessageArgs) => {
            if (targetIframeElement && targetIframeElement.contentWindow) {
                if (targetIframeElement.contentWindow) {
                    targetIframeElement.contentWindow.postMessage(args, '*');
                } else {
                    // eslint-disable-next-line no-console
                    console.error('No Iframe element in Editor');
                }
            } else {
                window.parent.postMessage(args, '*');
            }
        },
        [targetIframeElement],
    );

    const sendMessage = useCallback(
        (action: Action, {debug = DEBUG_MODE, direction = 'both'}: SendOptions = {}) => {
            if (debug) {
                if (metaSource === 'editor') {
                    // eslint-disable-next-line no-console
                    console.log(`🔵 Editor ➡️ ${action.type}`, action.payload);
                }

                if (metaSource === 'pc') {
                    // eslint-disable-next-line no-console
                    console.log(`🟢 Website ➡️ ${action.type}`, action.payload);
                }
            }

            if (direction === 'both') {
                sendPostMessage({action, debug});
                notifySubscribers(action, metaSource);
            } else if (direction === metaSource) {
                notifySubscribers(action, metaSource);
            } else {
                sendPostMessage({action, debug});
            }
        },
        [metaSource, notifySubscribers, sendPostMessage],
    );

    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            const {action, debug}: PostMessageArgs = e.data;

            if (urlOrigin && e.origin !== urlOrigin) {
                return;
            }

            if (action && action.type) {
                if (debug) {
                    if (metaSource === 'editor') {
                        // eslint-disable-next-line no-console
                        console.log(`🔵 ➡️ Editor ${action.type}`, action.payload);
                    }

                    if (metaSource === 'pc') {
                        // eslint-disable-next-line no-console
                        console.log(`🟢 ➡️ Website ${action.type}`, action.payload);
                    }
                }
                notifySubscribers(action, receiveMetaSource);
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, [metaSource, notifySubscribers, receiveMetaSource, targetIframeElement, urlOrigin]);

    return {
        sendMessage,
    };
};
