import {useMemo, useState} from 'react';

import {NavigationItemModel} from '../../models';
import {getNavigationItemWithIconSize} from '../utils';

const useActiveNavItem = (
    iconSize: number,
    leftItems: NavigationItemModel[],
    rightItems?: NavigationItemModel[],
) => {
    const [activeItemId, setActiveItemId] = useState<string | undefined>(undefined);

    const getNavigationItem = getNavigationItemWithIconSize(iconSize);

    const leftItemsWithIconSize = useMemo(
        () => leftItems.map(getNavigationItem),
        [getNavigationItem, leftItems],
    );
    const rightItemsWithIconSize = useMemo(
        () => rightItems?.map(getNavigationItem),
        [getNavigationItem, rightItems],
    );

    const onActiveItemChange = (id?: string) => {
        setActiveItemId(id);
    };
    return {activeItemId, leftItemsWithIconSize, rightItemsWithIconSize, onActiveItemChange};
};

export default useActiveNavItem;
