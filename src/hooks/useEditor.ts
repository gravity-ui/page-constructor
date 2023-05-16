import {useMemo, useState} from 'react';

import {List} from '@gravity-ui/uikit';

import {ConstructorBlock, PageData} from '../models';

export type EditorBlockId = number | string;

export function useEditor(initialData: PageData) {
    const [activeBlockId, setActiveBlockId] = useState<EditorBlockId>(-1);
    const [data, setData] = useState(initialData);

    return useMemo(() => {
        const onSelect = (id: EditorBlockId) => setActiveBlockId(id);
        const onDelete = (blockId: EditorBlockId) => {
            setData({
                ...data,
                content: {
                    ...data.content,
                    blocks: data.content.blocks.filter((block: ConstructorBlock, index: number) =>
                        typeof blockId === 'string' ? block.type !== blockId : index !== blockId,
                    ),
                },
            });
            setActiveBlockId(-1);
        };
        const onOrderChange = (index: number, newIndex: number) => {
            setData({
                ...data,
                content: {
                    ...data.content,
                    blocks: List.moveListElement([...data.content.blocks], index, newIndex),
                },
            });
        };

        return {
            data,
            editor: {
                activeBlockId,
                onDelete,
                onSelect,
                onOrderChange,
            },
        };
    }, [data, activeBlockId]);
}
