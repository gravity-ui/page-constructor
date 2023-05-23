import {PropsWithChildren} from 'react';

import {CustomConfig, PageData} from '../../models';

export type EditorBlockId = number | string;

export interface EditorProps {
    data: PageData;
    custom?: CustomConfig;
    onChange?: (data: PageData) => void;
}

export interface EditBlockEditorProps {
    activeBlockId: EditorBlockId;
    orderedBlocksCount: number;

    onSelect: (index: EditorBlockId) => void;
    onDelete: (index: EditorBlockId) => void;
    onCopy: (index: number) => void;
    onOrderChange: (index: number, newIndex: number) => void;
}

export interface EditBlockConstructorProps extends PropsWithChildren {
    id?: string;
}

export type EditBlockProps = EditBlockEditorProps & EditBlockConstructorProps;
