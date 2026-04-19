import _ from 'lodash';

import {ConfigInput} from '../form-generator';
import {PageContent} from '../models';

import {ItemConfig} from './types';
import {initializeStore} from './utils';
import {Fields} from '../form-generator-v2/types';

/** Undo/redo slice for editor-v2 (not synced to preview iframe payload). */
export interface EditorHistorySnapshot {
    content: PageContent;
    selectedBlock: number[] | null;
}

export interface EditorState {
    height?: number;
    deviceWidth?: string;
    zoom: number;

    manipulateOverlayMode: 'insert' | 'reorder' | false;
    selectedBlock: number[] | null;
    initialized: boolean;
    isPreviewMode: boolean;

    content: PageContent;
    blocks: Array<ItemConfig>;
    subBlocks: Array<ItemConfig>;
    global: Fields;

    preInsertBlockType: string | null;
    preReorderBlockPath: number[] | null;

    historyPast: EditorHistorySnapshot[];
    historyFuture: EditorHistorySnapshot[];
}

export const initialStore: EditorState = {
    height: 100,
    deviceWidth: '100%',
    zoom: 100,
    manipulateOverlayMode: false,
    selectedBlock: null,
    initialized: false,
    isPreviewMode: false,
    content: {blocks: []},
    blocks: [],
    subBlocks: [],
    global: [],
    preInsertBlockType: null,
    preReorderBlockPath: null,

    historyPast: [],
    historyFuture: [],
};

export const createPCEditorStore = initializeStore<EditorState>(initialStore, () => ({}));
