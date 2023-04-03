import React from 'react';

import {ClassNameProps, NavigationItemModel, NavigationItemType} from '../../../models';
import {block} from '../../../utils';
import {ItemColumnName} from '../../constants';
import {getItemClickHandler} from '../../utils';
import NavigationDropdownItem from '../NavigationDropdownItem/NavigationDropdownItem';
import NavigationItem from '../NavigationItem/NavigationItem';

import './NavigationListItem.scss';

const b = block('navigation-list-item');

type NavigationListItemProps = {
    item: NavigationItemModel;
    index: number;
    column: ItemColumnName;
    activeItemId?: string;
    highlightActiveItem?: boolean;
    hidePopup: () => void;
    onActiveItemChange: (id?: string) => void;
} & ClassNameProps;

export const NavigationListItem = ({
    item,
    className,
    index,
    activeItemId,
    highlightActiveItem,
    hidePopup,
    column,
    onActiveItemChange,
}: NavigationListItemProps) => {
    const id = `${column}-${index}`;
    const isActive = id === activeItemId;
    const onClick = getItemClickHandler({
        column,
        index,
        activeItemId,
        onActiveItemChange,
    });

    return (
        <li className={b(null, className)}>
            {item.type === NavigationItemType.Dropdown ? (
                <NavigationDropdownItem
                    className={b('content')}
                    data={item}
                    onClick={onClick}
                    isActive={isActive}
                    hidePopup={hidePopup}
                />
            ) : (
                <NavigationItem className={b('content')} data={item} onClick={onClick} />
            )}
            {highlightActiveItem && isActive && (
                <div className={b('slider-container')}>
                    <div className={b('slider')} />
                </div>
            )}
        </li>
    );
};
