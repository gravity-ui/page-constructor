import React from 'react';

import {ConstructorEditorProps} from '../../../src/editor/Containers/Editor';
import {ItemMap} from '../../containers/PageConstructor/PageConstructor';
import {LoadableConfig, ShouldRenderBlock} from '../../models';

export interface InnerContextType {
    blockTypes: string[];
    subBlockTypes: string[];
    headerBlockTypes: string[];
    itemMap: ItemMap;
    loadables?: LoadableConfig;
    shouldRenderBlock?: ShouldRenderBlock;
    editor?: ConstructorEditorProps;
}

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    subBlockTypes: [],
    headerBlockTypes: [],
    itemMap: {} as ItemMap,
});
