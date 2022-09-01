import React from 'react';
import {ItemMap} from '../../containers/PageConstructor/PageConstructor';
import {LoadableConfig} from '../../models';

export interface InnerContextType {
    blockTypes: string[];
    itemMap: ItemMap;
    customLoadable?: LoadableConfig;
}

export const InnerContext = React.createContext<InnerContextType>({
    blockTypes: [],
    itemMap: {} as ItemMap,
});
