import * as React from 'react';

import {NavItemMap} from '../../containers/PageConstructor/PageConstructor';
import {CustomConfig, LoadableConfig, PageContent, ShouldRenderBlock} from '../../models';
import {BlockData} from '../../constructor-items';

export interface InnerContextType {
    navItemMap: NavItemMap;
    loadables?: LoadableConfig;
    shouldRenderBlock?: ShouldRenderBlock;
    customization?: Pick<CustomConfig, 'decorators'>;
    microdata?: {
        contentUpdatedDate?: string;
    };
    blocks: Array<BlockData>;
    content: PageContent;
    setContent: React.Dispatch<React.SetStateAction<PageContent>>;
}

export const InnerContext = React.createContext<InnerContextType>({
    navItemMap: {} as NavItemMap,
    microdata: {},
    blocks: [],
    content: {blocks: []},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setContent: () => {},
});
