import React, {PropsWithChildren} from 'react';

import {
    Animatable,
    BlockDecorationProps,
    ConstructorItem,
    ThemedMediaProps,
    WithChildren,
} from './';

export interface PageData {
    content: PageContent;
}

export interface Menu {
    title: string;
}

export type ConstructorBlock = (ConstructorItem | CustomBlock) & {
    indent?: {
        top?: string;
        bottom?: string;
    };
    resetPaddings?: boolean;
};

export interface PageContent extends Animatable {
    blocks: ConstructorBlock[];
    menu?: Menu;
    background?: ThemedMediaProps;
}

export interface InitConstrucorState {
    hasMenu: boolean;
}

export interface CustomBlock {
    type: string;

    [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoadableData = any;
export type FetchLoadableDataParams = {
    blockKey: string;
    serviceId?: number;
};
export type FetchLoadableData<TData = LoadableData> = (
    params: FetchLoadableDataParams,
) => Promise<TData>;
export type ShouldRenderBlock = (block: ConstructorBlock, blockKey: string) => Boolean;
export type OnInit = (data: InitConstrucorState) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentProps = React.ComponentProps<React.ComponentClass<any>>;
export type CustomItem =
    | WithChildren<ComponentProps>
    | React.ComponentType<PropsWithChildren<ComponentProps>>;
export type CustomItems = Record<string, CustomItem>;

export interface LoadableConfigItem {
    fetch: FetchLoadableData;
    component: CustomItem;
}

export type LoadableConfig = Record<string, LoadableConfigItem>;

export interface CustomConfig {
    blocks?: CustomItems;
    subBlocks?: CustomItems;
    headers?: CustomItems;
    navigation?: CustomItems;
    loadable?: LoadableConfig;
    decorators?: {
        block?: ((props: BlockDecorationProps) => React.ReactElement)[];
    };
}
