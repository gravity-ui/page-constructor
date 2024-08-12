import React, {PropsWithChildren} from 'react';

import {CustomMobileMenuButtonProps, CustomMobileMenuItemsProps} from '../navigation/models';

import {Animatable, BlockDecorationProps, ConstructorItem, ThemedMediaProps} from './';

export interface PageData {
    content: PageContent;
}

export interface Menu {
    title: string;
}

export type ConstructorBlock = ConstructorItem | CustomBlock;

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
    | React.PropsWithChildren<ComponentProps>
    | React.ComponentType<PropsWithChildren<ComponentProps>>;
export type CustomItems = Record<string, CustomItem>;

export type CustomMobileMenuButton = React.ComponentType<CustomMobileMenuButtonProps>;
export type CustomMobileMenuItem = React.ComponentType<CustomMobileMenuItemsProps & ComponentProps>;
export type CustomMobileHeaderItem =
    | React.PropsWithChildren<CustomMobileMenuItemsProps & ComponentProps>
    | React.ComponentType<PropsWithChildren<CustomMobileMenuItemsProps & ComponentProps>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomHookData = Record<string, any>;

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
