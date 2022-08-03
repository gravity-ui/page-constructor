import React from 'react';
import {ItemMap} from '../../containers/PageConstructor/PageConstructor';
import {LoadableConfigItem} from '../../models';

export interface InnerContextType {
    blockTypes: string[];
    itemMap: ItemMap;
    customLoadable?: Record<'string', LoadableConfigItem>;
}

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    itemMap: {} as ItemMap,
});
