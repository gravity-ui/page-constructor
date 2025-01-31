import * as React from 'react';

import {
    NavigationButtonItem,
    NavigationDropdownItem,
    NavigationItemBase,
    NavigationItemModel,
    NavigationItemType,
    NavigationLinkItem,
} from '../models';

import {ItemColumnName} from './models';

type GetItemClickHandlerArgs = {
    column: ItemColumnName;
    index: number;
    activeItemId?: string;
    onActiveItemChange: (id?: string) => void;
};

export const getItemClickHandler: ({
    column,
    index,
    onActiveItemChange,
}: GetItemClickHandlerArgs) => React.MouseEventHandler =
    ({column, index, onActiveItemChange, activeItemId}) =>
    (e) => {
        const id = `${column}-${index}`;
        if (e) {
            e.stopPropagation();
        }
        onActiveItemChange(id === activeItemId ? undefined : `${column}-${index}`);
    };

const isButtonItem = (item: NavigationItemModel): item is NavigationButtonItem =>
    item.type === NavigationItemType.Button;

const isDropdownItem = (item: NavigationItemModel): item is NavigationDropdownItem =>
    item.type === NavigationItemType.Dropdown;

const iconSizeKey: keyof NavigationItemBase = 'iconSize';

export function getNavigationItemWithIconSize(iconSize = 20) {
    const getItem = (item: NavigationItemModel) => {
        const newItem = {...item};
        if ('items' in newItem && isDropdownItem(newItem)) {
            newItem.items = newItem.items.map(getItem) as NavigationLinkItem[];
        }

        if (!(iconSizeKey in newItem) && !isButtonItem(newItem)) {
            newItem.iconSize = iconSize;
        }
        return newItem;
    };

    return getItem;
}
