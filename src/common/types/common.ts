import {Action} from './actions';
import {BlockConfig} from './forms';
import {Meta} from './messages';

export interface ItemConfig {
    type: string;
    schema: BlockConfig;
}

export interface WithStoreReducer {
    reducer: (action: Action, meta: Meta) => void;
}

export type Subscriber<A extends Action = Action> = {
    action: A['type'];
    handler: (payload: A['payload'], meta: Meta) => void;
};
