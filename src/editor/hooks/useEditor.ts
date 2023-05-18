import {useMemo, useState} from 'react';

import {Block, CustomConfig, HeaderBlockTypes, PageData} from '../../models';
import {getCustomHeaderTypes, getHeaderBlock, getOrderedBlocks} from '../../utils';
import {addBlock, addEditorProps, changeBlocksOrder, duplicateBlock} from '../utils';

export type EditorBlockId = number | string;

export function useEditor(initialData: PageData, custom?: CustomConfig) {
    const [activeBlockId, setActiveBlockId] = useState<EditorBlockId>(-1);
    const [data, setData] = useState(() => addEditorProps(initialData));

    return useMemo(() => {
        const headerBlockTypes = [...HeaderBlockTypes, ...getCustomHeaderTypes(custom)];
        const header = getHeaderBlock(data.content.blocks, headerBlockTypes);
        const orderedBlocks = getOrderedBlocks(data.content.blocks, headerBlockTypes);
        const withHeader = (blocks: Block[]) => [header, ...blocks].filter(Boolean) as Block[];

        const onSelect = (id: EditorBlockId) => setActiveBlockId(id);
        const onDelete = (blockId: EditorBlockId) => {
            setData({
                ...data,
                content: {
                    ...data.content,
                    blocks:
                        typeof blockId === 'string'
                            ? data.content.blocks.filter(({type}: Block) => type !== blockId)
                            : withHeader(
                                  orderedBlocks.filter(
                                      (_block: Block, index: number) => index !== blockId,
                                  ),
                              ),
                },
            });
            setActiveBlockId(-1);
        };
        const onOrderChange = (oldIndex: number, newIndex: number) => {
            setData({
                ...data,
                content: {
                    ...data.content,
                    blocks: withHeader(changeBlocksOrder(orderedBlocks, oldIndex, newIndex)),
                },
            });
        };
        const onCopy = (index: number) => {
            setData({
                ...data,
                content: {
                    ...data.content,
                    blocks: withHeader(duplicateBlock(orderedBlocks, index)),
                },
            });
        };
        const onAdd = (block: Block) => {
            let blocks;

            if (headerBlockTypes.includes(block.type)) {
                blocks = header ? blocks : [block, ...orderedBlocks];
            } else {
                blocks = withHeader(addBlock(orderedBlocks, block, activeBlockId));
            }

            if (blocks) {
                setData({
                    ...data,
                    content: {
                        ...data.content,
                        blocks,
                    },
                });
            }
        };

        return {
            data,
            editor: {
                activeBlockId,
                blocksCount: orderedBlocks.length,
                onDelete,
                onSelect,
                onOrderChange,
                onCopy,
                onAdd,
            },
        };
    }, [data, activeBlockId]);
}
