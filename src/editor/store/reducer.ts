import {Block, CustomConfig, PageData} from '../../models';
import {getHeaderBlock, getOrderedBlocks} from '../../utils';

import {addBlock, changeBlocksOrder, duplicateBlock, getNewBlockIndex} from './utils';

export type EditorBlockId = number | string;

interface EditorState {
    data: PageData;
    activeBlockId: EditorBlockId;
    orderedBlocksCount: number;
    custom?: CustomConfig;
}

interface OrderBlockParams {
    oldIndex: number;
    newIndex: number;
}

// actions
export const SELECT_BLOCK = 'SELECT_BLOCK';
export const DELETE_BLOCK = 'DELETE_BLOCK';
export const COPY_BLOCK = 'COPY_BLOCK';
export const ADD_BLOCK = 'ADD_BLOCK';
export const SET_REGION = 'SET_REGION';
export const ORDER_BLOCK = 'ORDER_BLOCK';

interface SelectBlock {
    type: typeof SELECT_BLOCK;
    payload: EditorBlockId;
}

interface DeleteBlock {
    type: typeof DELETE_BLOCK;
    payload: EditorBlockId;
}

interface CopyBlock {
    type: typeof COPY_BLOCK;
    payload: number;
}

interface AddBlock {
    type: typeof ADD_BLOCK;
    payload: Block;
}

interface OrderBlock {
    type: typeof ORDER_BLOCK;
    payload: OrderBlockParams;
}

export type EditorAction = SelectBlock | DeleteBlock | CopyBlock | AddBlock | OrderBlock;

// reducer
export const getReducer =
    (headerBlockTypes: string[]) =>
    (state: EditorState, action: EditorAction): EditorState => {
        const {content} = state.data;
        const header = getHeaderBlock(content.blocks, headerBlockTypes);
        const orderedBlocks = getOrderedBlocks(content.blocks, headerBlockTypes);
        const withHeader = (blocks: Block[]) => [header, ...blocks].filter(Boolean) as Block[];
        const getNewState = (blocks: Block[], activeBlockId: EditorBlockId) => ({
            ...state,
            data: {
                ...state.data,
                content: {
                    ...content,
                    blocks,
                },
            },
            activeBlockId,
            orderedBlocksCount: orderedBlocks.length,
        });

        switch (action.type) {
            case SELECT_BLOCK:
                return getNewState(content.blocks, action.payload);
            case DELETE_BLOCK: {
                const blockId = action.payload;

                return getNewState(
                    typeof blockId === 'string'
                        ? content.blocks.filter(({type}: Block) => type !== blockId)
                        : withHeader(
                              orderedBlocks.filter(
                                  (_block: Block, index: number) => index !== blockId,
                              ),
                          ),
                    -1,
                );
            }
            case COPY_BLOCK: {
                const index = action.payload;

                return getNewState(withHeader(duplicateBlock(orderedBlocks, index)), index + 1);
            }
            case ADD_BLOCK: {
                let blocks;
                let activeBlockId;
                const block = action.payload;

                if (headerBlockTypes.includes(block.type)) {
                    blocks = header ? blocks : [block, ...orderedBlocks];
                    activeBlockId = block.type;
                } else {
                    const newBlockIndex = getNewBlockIndex(
                        state.activeBlockId,
                        orderedBlocks.length,
                    );
                    blocks = withHeader(addBlock(orderedBlocks, block, newBlockIndex));
                    activeBlockId = newBlockIndex;
                }

                if (blocks) {
                    return getNewState(blocks, activeBlockId);
                }

                return state;
            }
            case ORDER_BLOCK: {
                const {oldIndex, newIndex} = action.payload;

                return getNewState(
                    withHeader(changeBlocksOrder(orderedBlocks, oldIndex, newIndex)),
                    newIndex,
                );
            }
            default:
                return state;
        }
    };
