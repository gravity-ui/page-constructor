import React from 'react';

import {ItemMap, NavItemMap} from '../../containers/PageConstructor/PageConstructor';
import {CustomConfig, LoadableConfig, ShouldRenderBlock} from '../../models';

export interface InnerContextType {
    blockTypes: string[];
    subBlockTypes: string[];
    headerBlockTypes: string[];
    navigationBlockTypes: string[];
    itemMap: ItemMap;
    navItemMap: NavItemMap;
    loadables?: LoadableConfig;
    shouldRenderBlock?: ShouldRenderBlock;
    customization?: Pick<CustomConfig, 'decorators'>;
    microdata?: {
        contentUpdatedDate?: string;
    };
}

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    subBlockTypes: [],
    headerBlockTypes: [],
    navigationBlockTypes: [],
    itemMap: {} as ItemMap,
    navItemMap: {} as NavItemMap,
    microdata: {},
});
