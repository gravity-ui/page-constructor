import {ConstructorBlock, PageContent, Theme} from '../../models';
import {ViewModeItem} from '../types';

import {addBlock, changeBlocksOrder, duplicateBlock, getErrorBoundaryState} from './utils';

export type EditorBlockId = number | string;

interface EditorState {
    content: PageContent;
    activeBlockIndex: number;
    errorBoundaryState: number;
    viewMode: ViewModeItem;
    theme: Theme;
}

interface OrderBlockParams {
    oldIndex: number;
    newIndex: number;
}

interface AddBlockParams {
    block: ConstructorBlock;
    index: number;
}

// actions
export const SELECT_BLOCK = 'SELECT_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const COPY_BLOCK = 'COPY_BLOCK';
export const ADD_BLOCK = 'ADD_BLOCK';
export const SET_REGION = 'SET_REGION';
export const ORDER_BLOCK = 'ORDER_BLOCK';
export const UPDATE_CONTENT = 'UPDATE_CONTENT';
export const UPDATE_VIEW_MODE = 'UPDATE_VIEW_MODE';
export const UPDATE_THEME = 'UPDATE_THEME';

interface SelectBlock {
    type: typeof SELECT_BLOCK;
    payload: number;
}

interface DeleteBlock {
    type: typeof DELETE_BLOCK;
    payload: number;
}

interface CopyBlock {
    type: typeof COPY_BLOCK;
    payload: number;
}

interface AddBlock {
    type: typeof ADD_BLOCK;
    payload: AddBlockParams;
}

interface OrderBlock {
    type: typeof ORDER_BLOCK;
    payload: OrderBlockParams;
}

interface UpdateContent {
    type: typeof UPDATE_CONTENT;
    payload: PageContent;
}

interface UpdateViewMode {
    type: typeof UPDATE_VIEW_MODE;
    payload: ViewModeItem;
}

interface UpdateTheme {
    type: typeof UPDATE_THEME;
    payload: Theme;
}

export type EditorAction =
    | SelectBlock
    | DeleteBlock
    | CopyBlock
    | AddBlock
    | OrderBlock
    | UpdateContent
    | UpdateViewMode
    | UpdateTheme;

// reducer
export const reducer = (state: EditorState, action: EditorAction): EditorState => {
    const {content} = state;
    const getNewState = (blocks: ConstructorBlock[], activeBlockIndex: number) => ({
        ...state,
        content: {
            ...content,
            blocks,
        },
        activeBlockIndex,
    });

    switch (action.type) {
        case UPDATE_CONTENT:
            return {
                ...state,
                content: action.payload,
                errorBoundaryState: getErrorBoundaryState(state.errorBoundaryState),
            };
        case SELECT_BLOCK:
            return {
                ...state,
                activeBlockIndex: action.payload,
            };
        case DELETE_BLOCK: {
            const blockId = action.payload;

            return getNewState(
                content.blocks.filter(
                    (_block: ConstructorBlock, index: number) => index !== blockId,
                ),
                -1,
            );
        }
        case COPY_BLOCK: {
            const index = action.payload;

            return getNewState(duplicateBlock(content.blocks, index), index + 1);
        }
        case ADD_BLOCK: {
            const {block, index} = action.payload;

            return getNewState(addBlock(content.blocks, block, index), index);
        }
        case ORDER_BLOCK: {
            const {oldIndex, newIndex} = action.payload;

            return getNewState(changeBlocksOrder(content.blocks, oldIndex, newIndex), newIndex);
        }
        case UPDATE_VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload,
            };
        case UPDATE_THEME:
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return state;
    }
};
