import {useMemo, useReducer} from 'react';

import {getCustomHeaderTypes, getOrderedBlocks} from '../../../src/utils';
import {Block, CustomConfig, HeaderBlockTypes, PageData} from '../../models';
import EditBlockControl from '../Components/EditBlockControl/EditBlockControl';

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

export function useEditorState(initialData: PageData, custom?: CustomConfig) {
    const headerBlockTypes = useMemo(
        () => [...HeaderBlockTypes, ...getCustomHeaderTypes(custom)],
        [custom],
    );
    const reducer = useMemo(() => getReducer(headerBlockTypes), [headerBlockTypes]);
    const [{activeBlockId, data, orderedBlocksCount}, dispatch] = useReducer(reducer, {
        activeBlockId: 0,
        orderedBlocksCount: getOrderedBlocks(initialData.content.blocks, headerBlockTypes).length,
        data: addEditorProps(initialData),
    });

    return useMemo(() => {
        return {
            data,
            editor: {
                activeBlockId,
                orderedBlocksCount,

                ControlsComponent: EditBlockControl,

                onDelete: (id: EditorBlockId) => dispatch({type: DELETE_BLOCK, payload: id}),
                onSelect: (id: EditorBlockId) => dispatch({type: SELECT_BLOCK, payload: id}),
                onCopy: (index: number) => dispatch({type: COPY_BLOCK, payload: index}),
                onOrderChange: (oldIndex: number, newIndex: number) =>
                    dispatch({type: ORDER_BLOCK, payload: {oldIndex, newIndex}}),
                onAdd: (block: Block) => dispatch({type: ADD_BLOCK, payload: block}),
            },
        };
    }, [data, activeBlockId, orderedBlocksCount]);
}
