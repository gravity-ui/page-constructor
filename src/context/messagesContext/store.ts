import {Subscriber} from '../../types';
import {initializeStore} from '../../utils/store';

import {SubscriptionFunc} from './types';

export interface MessagesState {
    subscribers: Subscriber[];
}

export interface MessagesMethods {
    subscribe: SubscriptionFunc;
    unsubscribe: SubscriptionFunc;
}

export type MessagesStore = MessagesState & MessagesMethods;

export const createMessagesStore = initializeStore<MessagesState, MessagesMethods>(
    {
        subscribers: [],
    },
    (set, _get) => ({
        subscribe: (type, payloadCallback) => {
            set((state) => ({
                ...state,
                subscribers: [...state.subscribers, {action: type, handler: payloadCallback}],
            }));

            return () => {
                set((state) => ({
                    ...state,
                    subscribers: state.subscribers.filter(
                        ({handler, action}) => payloadCallback !== handler || type !== action,
                    ),
                }));
            };
        },
        unsubscribe: (type, payloadCallback) => {
            set((state) => ({
                ...state,
                subscribers: state.subscribers.filter(
                    ({handler, action}) => payloadCallback !== handler || type !== action,
                ),
            }));
        },
    }),
);
