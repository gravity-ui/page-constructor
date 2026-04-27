import * as React from 'react';

import {BlockData} from '../../constructor-items';
import {NavItemMap} from '../../containers/PageConstructor/PageConstructor';
import {BlockWrapperDataProps, LoadableConfig, PageContent, ShouldRenderBlock} from '../../models';

export interface BlockWrapperEntry {
    wrapper: React.ComponentType<BlockWrapperDataProps & React.PropsWithChildren>;
    props?: object;
}

export interface InnerContextType {
    navItemMap: NavItemMap;
    loadables?: LoadableConfig;
    shouldRenderBlock?: ShouldRenderBlock;
    blockWrappers?: BlockWrapperEntry[];
    blocks: Array<BlockData>;
    content: PageContent;
    setContent: React.Dispatch<React.SetStateAction<PageContent>>;
}

export const InnerContext = React.createContext<InnerContextType>({
    navItemMap: {} as NavItemMap,
    blocks: [],
    content: {blocks: []},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setContent: () => {},
});
