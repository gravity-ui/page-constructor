import {PageConstructorProps} from '../../containers/PageConstructor';
import {BlockDecorationProps, PageData} from '../../models';
import {SchemaCustomConfig} from '../../schema';
import {EditBlockActions} from '../components/EditBlock/EditBlock';

export type EditorBlockId = number | string;

export interface EditorProps
    extends Required<Pick<PageConstructorProps, 'content'>>,
        Partial<Omit<PageConstructorProps, 'content'>> {
    children: (props: Partial<PageConstructorProps>) => React.ReactNode;
    onChange?: (data: PageData) => void;
    customSchema?: SchemaCustomConfig;
}

export interface EditBlockEditorProps {
    isActive?: boolean;
    onSelect: () => void;
    actions: EditBlockActions;
}

export interface EditBlockProps extends EditBlockEditorProps, BlockDecorationProps {
    isHeader?: boolean;
}
