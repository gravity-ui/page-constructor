import {PageConstructorProps} from '../../containers/PageConstructor';
import {BlockDecoratorProps, PageData} from '../../models';
import {EditBlockActions} from '../Components/EditBlock/EditBlock';

export type EditorBlockId = number | string;

export interface EditorProps
    extends Required<Pick<PageConstructorProps, 'content'>>,
        Partial<Omit<PageConstructorProps, 'content'>> {
    children: (props: Partial<PageConstructorProps>) => React.ReactNode;
    onChange?: (data: PageData) => void;
}

export interface EditBlockEditorProps {
    isActive?: boolean;
    onSelect: () => void;
    actions: EditBlockActions;
}

export type EditBlockProps = EditBlockEditorProps & BlockDecoratorProps;
