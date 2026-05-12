import {POST_MESSAGE_SOURCE} from '../constants';
import {EditorState} from '../store';

import {MessageTypes} from './actions';

export type PostMessageAPIMessage<K extends keyof MessageTypes> = {
    action: K;
    data: MessageTypes[K];
    source: typeof POST_MESSAGE_SOURCE;
};

export type StoreSyncMessage = {
    state: EditorState;
    source: typeof POST_MESSAGE_SOURCE;
};
