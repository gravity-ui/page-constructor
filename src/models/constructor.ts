import React from 'react';
import {MediaProps, Block, Animatable} from './blocks';

export interface PageData {
    content: PageContent;
}

export interface Menu {
    title: string;
}

export interface PageContent extends Animatable {
    blocks: Block[];
    menu?: Menu;
    background?: MediaProps;
    footnotes?: string[];
}

export interface InitConstrucorState {
    hasMenu: boolean;
}

export interface CustomBlock {
    type: string;
    [key: string]: unknown;
}

export type ConstructorBlock = Block | CustomBlock;

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
export type CustomComponent = React.ComponentType<React.ComponentProps<React.ComponentClass<any>>>;
export type CustomBlocks = Record<string, CustomComponent>;

export interface LoadableConfigItem {
    fetch: FetchLoadableData;
    component: CustomComponent;
}

export type LoadableConfig = Record<string, LoadableConfigItem>;

export interface CustomConfig {
    blocks?: CustomBlocks;
    headers?: CustomBlocks;
    loadable?: LoadableConfig;
}
