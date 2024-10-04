import {Meta} from '../context/messagesContext/types';

import {Action} from './actions';
import {BlockFormSchema} from './dynamic-form';

export interface ItemConfig {
    type: string;
    schema: BlockFormSchema;
}

export interface WithStoreReducer {
    reducer: (action: Action, meta: Meta) => void;
}

export type Subscriber<A extends Action = Action> = {
    action: A['type'];
    handler: (payload: A['payload'], meta: Meta) => void;
};
