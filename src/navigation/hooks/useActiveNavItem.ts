import * as React from 'react';

import {NavigationItemModel} from '../../models';
import {getNavigationItemWithIconSize} from '../utils';

const useActiveNavItem = (
    iconSize: number,
    leftItems: NavigationItemModel[],
    rightItems?: NavigationItemModel[],
) => {
    const [activeItemId, setActiveItemId] = React.useState<string | undefined>(undefined);

    const getNavigationItem = getNavigationItemWithIconSize(iconSize);

    const leftItemsWithIconSize = React.useMemo(
        () => leftItems.map(getNavigationItem),
        [getNavigationItem, leftItems],
    );
    const rightItemsWithIconSize = React.useMemo(
        () => rightItems?.map(getNavigationItem),
        [getNavigationItem, rightItems],
    );

    const onActiveItemChange = (id?: string) => {
        setActiveItemId(id);
    };
    return {activeItemId, leftItemsWithIconSize, rightItemsWithIconSize, onActiveItemChange};
};

export default useActiveNavItem;
