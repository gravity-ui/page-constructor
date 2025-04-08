import {PageContentWithNavigation} from '../../models';
import {EditorState} from '../store';

export type MessageTypes = EventMessageTypes & ActionMessageTypes;

export type EventMessageTypes = {
    ON_INIT: {height: number};
    ON_RESIZE: {height: number};
    ON_MOUSE_UP: {path?: number[]; rect?: DOMRect; position?: string};
    ON_MOUSE_MOVE: {x: number; y: number};
    ON_HOVER_BLOCK: {rect?: DOMRect; position?: string};
    ON_CLICK_BLOCK: {path: number[]};
    ON_UPDATE_BLOCK_SELECTION: {rect: DOMRect};
    ON_SUPPORTED_BLOCKS: Pick<EditorState, 'blocks' | 'subBlocks' | 'global'>;
    ON_INITIAL_CONTENT: PageContentWithNavigation;
};

export type ActionMessageTypes = {
    GET_SUPPORTED_BLOCKS: {};
    GET_INITIAL_CONTENT: {};
};
