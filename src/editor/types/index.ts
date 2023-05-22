import {PropsWithChildren} from 'react';

import {Block, CustomConfig, PageData} from '../../models';

export type EditorBlockId = number | string;

export interface EditorIncomingProps {
    data: PageData;
    custom?: CustomConfig;
    onChange?: (data: PageData) => void;
}

export interface EditBlockProps extends PropsWithChildren {
    id?: string;
}

export interface EditorPassingProps {
    activeBlockId: EditorBlockId;
    orderedBlocksCount: number;
    ControlsComponent: React.FunctionComponent<EditBlockProps>;

    onSelect: (index: EditorBlockId) => void;
    onDelete: (index: EditorBlockId) => void;
    onCopy: (index: number) => void;
    onAdd: (data: Block) => void;
    onOrderChange: (index: number, newIndex: number) => void;
}
