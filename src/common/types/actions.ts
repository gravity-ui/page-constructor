import {PageContent} from '../../models';
import {EditorState} from '../store';

import {RectMapEntry} from './rect';

export type MessageTypes = EventMessageTypes & ActionMessageTypes;

export type EventMessageTypes = {
    ON_INIT: {height: number};
    ON_RESIZE: {height: number};
    ON_UPDATE_RECT_MAP: {rects: RectMapEntry[]};
    ON_SUPPORTED_BLOCKS: Pick<EditorState, 'blocks' | 'subBlocks' | 'global'>;
    ON_INITIAL_CONTENT: PageContent;
    /** Iframe → parent: user pressed Cmd/Ctrl+Z while preview had focus (parent runs editor undo). */
    ON_EDITOR_UNDO: {};
    /** Iframe → parent: Cmd/Ctrl+Shift+Z */
    ON_EDITOR_REDO: {};
};

export type ActionMessageTypes = {
    GET_SUPPORTED_BLOCKS: {};
    GET_INITIAL_CONTENT: {};
};
