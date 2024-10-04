import {Action} from '../../types/actions';

export interface SendOptions {
    direction?: MetaSource | 'both';
    debug?: boolean;
}

export interface PostMessageArgs {
    action: Action;
    debug: boolean;
}

export type SubscriptionFunc = <A extends Action>(
    type: A['type'],
    payloadCallback: (payload: A['payload'], meta: Meta) => void,
) => void;

export type MetaSource = 'pc' | 'editor';

export interface Meta {
    source: MetaSource;
}
