import React from 'react';
import {ItemMap} from '../../containers/PageConstructor/PageConstructor';
import {ConstructorItem, LoadableConfig} from '../../models';

export type ItemWrapper = (
    item: React.ReactElement,
    key: string,
    data: ConstructorItem,
    context: WrapperContext,
) => React.ReactElement;

export interface InnerContextType {
    blockTypes: string[];
    subBlockTypes: string[];
    headerBlockTypes: string[];
    itemMap: ItemMap;
    loadables?: LoadableConfig;

    itemWrappers: ItemWrapper[];
}

export type WrapperContext = Omit<InnerContextType, 'itemWrappers'>;

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    subBlockTypes: [],
    headerBlockTypes: [],

    itemMap: {} as ItemMap,
    itemWrappers: [],
});
