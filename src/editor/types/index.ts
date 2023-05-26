import {PageConstructorProps} from '../../containers/PageConstructor';
import {BlockDecoratorProps, PageData} from '../../models';

export type EditorBlockId = number | string;

export interface EditorProps
    extends Required<Pick<PageConstructorProps, 'content'>>,
        Partial<Omit<PageConstructorProps, 'content'>> {
    children: (props: Partial<PageConstructorProps>) => React.ReactNode;
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

export type EditBlockProps = EditBlockEditorProps & BlockDecoratorProps;
