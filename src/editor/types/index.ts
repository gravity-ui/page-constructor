import {BlockDecorationProps} from '../../extensions/BlockDecoration';
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

export type EditBlockProps = EditBlockEditorProps & BlockDecorationProps;
