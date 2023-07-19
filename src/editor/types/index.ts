import {PageConstructorProps, PageConstructorProviderProps} from '../../containers/PageConstructor';
import {BlockDecorationProps, PageContent} from '../../models';
import {SchemaCustomConfig} from '../../schema';
import {EditBlockActions} from '../components/EditBlock/EditBlock';

export type EditorBlockId = number | string;

export interface EditorOutgoingProps extends Partial<PageConstructorProps> {
    viewMode: ViewModeItem;
}

export interface EditorProps
    extends Required<Pick<PageConstructorProps, 'content'>>,
        Partial<Omit<PageConstructorProps, 'content'>> {
    children: (props: EditorOutgoingProps) => React.ReactNode;
    providerProps?: PageConstructorProviderProps;
    onChange?: (data: PageContent) => void;
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

export enum ViewModeItem {
    Edititng = 'editing',
    Desktop = 'desktop',
    Tablet = 'tablet',
    Mobile = 'mobile',
}
