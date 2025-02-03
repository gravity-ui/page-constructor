import {EditorState} from '../store';

import {MessageTypes} from './actions';

export type PostMessageAPIMessage<K extends keyof MessageTypes> = {
    action: K;
    data: MessageTypes[K];
};

export type StoreSyncMessage = {
    state: EditorState;
};
