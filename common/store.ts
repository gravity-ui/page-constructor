import _ from 'lodash';

import {Content} from '../src/models';

import {ConfigInput, ItemConfig} from './types';
import {initializeStore} from './utils';

export interface EditorState {
    height?: number;
    zoom: number;

    manipulateOverlayMode: 'insert' | 'reorder' | false;
    selectedBlock?: number[];
    initialized: boolean;

    content: Content;
    blocks: Array<ItemConfig>;
    subBlocks: Array<ItemConfig>;
    global: Array<ConfigInput>;

    preInsertBlockType: string | null;
    preReorderBlockPath: number[] | null;
}

export const initialStore: EditorState = {
    height: 100,
    zoom: 100,
    manipulateOverlayMode: false,
    selectedBlock: undefined,
    initialized: false,
    content: {blocks: []},
    blocks: [],
    subBlocks: [],
    global: [],
    preInsertBlockType: null,
    preReorderBlockPath: null,
};

export const createPCEditorStore = initializeStore<EditorState>(initialStore, () => ({}));
