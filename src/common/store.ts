import _ from 'lodash';

import {PageContentWithNavigation} from '../models';

import {ConfigInput, ItemConfig} from './types';
import {initializeStore} from './utils';

export interface EditorState {
    height?: number;
    deviceWidth?: string;
    zoom: number;

    manipulateOverlayMode: 'insert' | 'reorder' | false;
    selectedBlock: number[] | null;
    initialized: boolean;
    isPreviewMode: boolean;

    content: PageContentWithNavigation;
    blocks: Array<ItemConfig>;
    subBlocks: Array<ItemConfig>;
    global: Array<ConfigInput>;

    preInsertBlockType: string | null;
    preReorderBlockPath: number[] | null;
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
};

export const createPCEditorStore = initializeStore<EditorState>(initialStore, () => ({}));
