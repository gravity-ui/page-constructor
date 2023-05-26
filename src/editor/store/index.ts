import {useMemo, useReducer} from 'react';

import {Block, BlockDecoratorProps, HeaderBlockTypes, PageContent} from '../../models';
import {getBlockIndexFromId, getCustomHeaderTypes, getHeaderBlock} from '../../utils';
import {EditBlockActions, EditBlockControls} from '../Components/EditBlock/EditBlock';
import {EditBlockProps, EditorProps} from '../types';

import {
    ADD_BLOCK,
    COPY_BLOCK,
    DELETE_BLOCK,
    ORDER_BLOCK,
    SELECT_BLOCK,
    UPDATE_CONTENT,
    reducer,
} from './reducer';
import {addEditorProps} from './utils';

export type EditorBlockId = number | string;

export function useEditorState({content: intialContent, custom}: Omit<EditorProps, 'children'>) {
    const headerBlockTypes = useMemo(
        () => [...HeaderBlockTypes, ...getCustomHeaderTypes(custom)],
        [custom],
    );

    const [{activeBlockIndex, content}, dispatch] = useReducer(reducer, {
        activeBlockIndex: 0,
        content: addEditorProps(intialContent),
    });
    const contentHasHeader = Boolean(getHeaderBlock(content.blocks, headerBlockTypes));

    return useMemo(() => {
        const onAdd = (block: Block) => {
            const isHeader = headerBlockTypes.includes(block.type);

            if (contentHasHeader && isHeader) {
                //TODO: add warning that it should be only one header block
                return;
            }

            // eslint-disable-next-line no-nested-ternary
            const index = isHeader
                ? 0
                : activeBlockIndex === -1
                ? content.blocks.length
                : activeBlockIndex + 1;

            dispatch({type: ADD_BLOCK, payload: {block, index}});
        };
        const onSelect = (index: number) => dispatch({type: SELECT_BLOCK, payload: index});

        const injectEditBlockProps = (props: BlockDecoratorProps) => {
            const {id, isHeader} = props;
            const orderedBlocksStartIndex = contentHasHeader ? 1 : 0;
            const index = isHeader ? 0 : getBlockIndexFromId(id) + orderedBlocksStartIndex;
            const isActive = activeBlockIndex === index;
            const actions: EditBlockActions = {
                [EditBlockControls.Delete]: () => dispatch({type: DELETE_BLOCK, payload: index}),
            };

            if (!isHeader) {
                actions[EditBlockControls.Copy] = () =>
                    dispatch({type: COPY_BLOCK, payload: index});

                if (index > orderedBlocksStartIndex) {
                    actions[EditBlockControls.Up] = () =>
                        dispatch({
                            type: ORDER_BLOCK,
                            payload: {oldIndex: index, newIndex: index - 1},
                        });
                }

                if (index < content.blocks.length - 1) {
                    actions[EditBlockControls.Down] = () =>
                        dispatch({
                            type: ORDER_BLOCK,
                            payload: {oldIndex: index, newIndex: index + 1},
                        });
                }
            }

            return {
                ...props,
                isActive,
                onSelect: () => onSelect(index),
                actions,
            } as EditBlockProps;
        };

        return {
            activeBlockIndex,
            content,
            injectEditBlockProps,
            onAdd,
            onSelect,
            onContentUpdate: (newContent: PageContent) =>
                dispatch({type: UPDATE_CONTENT, payload: newContent}),
        };
    }, [content, activeBlockIndex, contentHasHeader, headerBlockTypes]);
}
