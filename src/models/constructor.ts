import * as React from 'react';

import {Animatable, ConstructorItem} from './';

export interface PageData {
    content: PageContent;
}

export type ConstructorBlock = ConstructorItem | CustomBlock;

/**
 * Core PageContent type - minimal fields that the engine needs.
 * Plugins can extend this with their own fields using the index signature.
 */
export interface PageContent extends Animatable {
    blocks: ConstructorBlock[];
    // Allow plugin-specific fields to pass through
    [key: string]: unknown;
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
    | React.ComponentType<React.PropsWithChildren<ComponentProps>>;
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
}
