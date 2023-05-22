import React from 'react';

import {ItemMap} from '../../containers/PageConstructor/PageConstructor';
import {EditorPassingProps} from '../../editor/types';
import {LoadableConfig, ShouldRenderBlock} from '../../models';

export interface InnerContextType {
    blockTypes: string[];
    subBlockTypes: string[];
    headerBlockTypes: string[];
    itemMap: ItemMap;
    loadables?: LoadableConfig;
    shouldRenderBlock?: ShouldRenderBlock;
    editor?: EditorPassingProps;
}

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    subBlockTypes: [],
    headerBlockTypes: [],
    itemMap: {} as ItemMap,
});
