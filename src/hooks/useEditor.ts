import {useMemo, useState} from 'react';

import {List} from '@gravity-ui/uikit';

import {ConstructorBlock, PageData} from '../models';

export function useEditor(initialData: PageData) {
    const [activeBlockId, setActiveBlockId] = useState(0);
    const [data, setData] = useState(initialData);

    return useMemo(() => {
        const onSelect = (id: number) => setActiveBlockId(id);
        const onDelete = (blockId: number) => {
            setData({
                ...data,
                content: {
                    ...data.content,
                    blocks: data.content.blocks.filter(
                        (_block: ConstructorBlock, index: number) => index !== blockId,
                    ),
                },
            });
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
