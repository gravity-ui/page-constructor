import {PageConstructorProps, PageConstructorProviderProps} from '../../containers/PageConstructor';
import {BlockDecorationProps, PageContent} from '../../models';
import {Theme} from '../../models/common';
import {SchemaCustomConfig} from '../../schema';
import {EditBlockActions} from '../components/EditBlock/EditBlock';

export type EditorBlockId = number | string;

interface ContentTransformersOptions {
    viewMode?: ViewModeItem;
    editMode?: EditModeItem;
}

export type ContentTransformer = (
    content: PageContent,
    options: ContentTransformersOptions,
) => PageContent;

export interface DeviceEmulationSettings {
    customStyles?: string;
    applyHostStyles?: boolean;
}

export interface EditorProps
    extends Required<Pick<PageConstructorProps, 'content'>>,
        Partial<Omit<PageConstructorProps, 'content'>> {
    providerProps?: PageConstructorProviderProps;
    onChange?: (data: PageContent) => void;
    transformContent?: ContentTransformer;
    customSchema?: SchemaCustomConfig;
    deviceEmulationSettings?: DeviceEmulationSettings;
    theme?: Theme;
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
    Desktop = 'desktop',
    Tablet = 'tablet',
    Mobile = 'mobile',
}

export enum EditModeItem {
    View = 'view',
    Form = 'form',
    Code = 'code',
}
