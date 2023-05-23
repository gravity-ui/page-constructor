import React from 'react';

import {ItemMap} from '../../containers/PageConstructor/PageConstructor';
import {ConstructorExtensions, LoadableConfig, ShouldRenderBlock} from '../../models';

export interface InnerContextType {
    blockTypes: string[];
    subBlockTypes: string[];
    headerBlockTypes: string[];
    itemMap: ItemMap;
    loadables?: LoadableConfig;
    shouldRenderBlock?: ShouldRenderBlock;
    extensions?: ConstructorExtensions;
}

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    subBlockTypes: [],
    headerBlockTypes: [],
    itemMap: {} as ItemMap,
});
