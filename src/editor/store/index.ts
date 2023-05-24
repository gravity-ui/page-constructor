import {useMemo, useReducer} from 'react';

import {Block, HeaderBlockTypes} from '../../models';
import {getCustomHeaderTypes, getOrderedBlocks} from '../../utils';
import {EditorProps} from '../types';

import {
    ADD_BLOCK,
    COPY_BLOCK,
    DELETE_BLOCK,
    ORDER_BLOCK,
    SELECT_BLOCK,
    getReducer,
} from './reducer';
import {addEditorProps} from './utils';

export type EditorBlockId = number | string;

export function useEditorState({content: intialContent, custom}: Omit<EditorProps, 'children'>) {
    const headerBlockTypes = useMemo(
        () => [...HeaderBlockTypes, ...getCustomHeaderTypes(custom)],
        [custom],
    );
    const reducer = useMemo(() => getReducer(headerBlockTypes), [headerBlockTypes]);
    const [{activeBlockId, content, orderedBlocksCount}, dispatch] = useReducer(reducer, {
        activeBlockId: 0,
        orderedBlocksCount: getOrderedBlocks(intialContent.blocks, headerBlockTypes).length,
        content: addEditorProps(intialContent),
    });

    return useMemo(() => {
        return {
            content,
            editControlsProps: {
                activeBlockId,
                orderedBlocksCount,
                onDelete: (id: EditorBlockId) => dispatch({type: DELETE_BLOCK, payload: id}),
                onSelect: (id: EditorBlockId) => dispatch({type: SELECT_BLOCK, payload: id}),
                onCopy: (index: number) => dispatch({type: COPY_BLOCK, payload: index}),
                onOrderChange: (oldIndex: number, newIndex: number) =>
                    dispatch({type: ORDER_BLOCK, payload: {oldIndex, newIndex}}),
            },
            onAdd: (block: Block) => dispatch({type: ADD_BLOCK, payload: block}),
        };
    }, [content, activeBlockId, orderedBlocksCount]);
}
