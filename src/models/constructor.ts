import React from 'react';
import {MediaProps, Block} from './blocks';

export interface Menu {
    title: string;
}

export interface PageContent extends Animatable {
    blocks: Block[];
    menu?: Menu;
    background?: MediaProps;
    footnotes?: string[];
}

// TODO manage with types CLOUDFRONT-8475
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetchLoadableData<TData = any> = (blockKey: string) => Promise<TData>;

export type ShouldRenderBlock = (block: Block, blockKey: string) => Boolean;

export interface InitConstrucorState {
    hasMenu: boolean;
}

export type OnInit = (data: InitConstrucorState) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomBlock = Record<any, any>;

export interface LoadableConfigItem {
    fetch: FetchLoadableData;
    //TODO: remove any after removing withTranslation hoc in package
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.ComponentType<any>;
    minCount?: number;
}

export type LoadableConfig = Record<string, LoadableConfigItem>;

export interface CustomConfig {
    blocks?: CustomBlock;
    headers?: CustomBlock;
    loadable?: LoadableConfig;
    renderMenu?: () => React.ReactNode;
}

export interface SSRConfig {
    hostname: string;
    isServer?: boolean;
}
