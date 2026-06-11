import * as React from 'react';

import {BlockData} from '../../constructor-items';
import {BlocksContext} from '../../context/blocksContext';
import {PCEditorStoreProvider} from '../../context/editorStoreContext';

export interface PageConstructorProviderProps {
    blocks?: Array<BlockData>;
}

export const PageConstructorProvider = (
    props: React.PropsWithChildren<PageConstructorProviderProps>,
) => {
    const {children, blocks = []} = props;

    /* eslint-disable react/jsx-key */
    const context = [
        <BlocksContext.Provider value={{blocks}} />,
        <PCEditorStoreProvider />,
    ].reduceRight((prev, provider) => React.cloneElement(provider, {}, prev), children);
    /* eslint-enable react/jsx-key */

    return <React.Fragment>{context}</React.Fragment>;
};
