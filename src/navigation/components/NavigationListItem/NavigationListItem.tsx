import React, {useRef} from 'react';

import {block} from '../../../utils';
import {ClassNameProps, NavigationItemModel, NavigationItemType} from '../../../models';
import {getItemClickHandler} from '../../utils';
import {ItemColumnName} from '../../constants';
import NavigationDropdownItem from '../NavigationDropdownItem/NavigationDropdownItem';
import NavigationItem from '../NavigationItem/NavigationItem';

import './NavigationListItem.scss';

const b = block('navigation');

type NavigationListItemProps = {
    item: NavigationItemModel;
    index: number;
    column: ItemColumnName;
    activeItemId?: string;
    itemPositions?: number[];
    itemRefs?: React.MutableRefObject<(HTMLLIElement | null)[]>;
    highlightActiveItem?: boolean;
    hidePopup: () => void;
    onActiveItemChange: (index?: string) => void;
} & ClassNameProps;

export const NavigationListItem = ({
    item,
    itemRefs,
    className,
    index,
    activeItemId,
    highlightActiveItem,
    hidePopup,
    itemPositions,
    column,
    onActiveItemChange,
}: NavigationListItemProps) => {
    const ref = useRef<HTMLLIElement | null>(null);
    const id = `${column}-${index}`;
    const isActive = id === activeItemId;
    const onClick = getItemClickHandler({
        column,
        index,
        activeItemId,
        onActiveItemChange,
    });

    return (
        <li ref={itemRefs ? (el) => itemRefs.current.push(el) : ref} className={className}>
            {item.type === NavigationItemType.Dropdown ? (
                <NavigationDropdownItem
                    data={item}
                    onClick={onClick}
                    isActive={isActive}
                    position={
                        itemPositions?.[index] || ref.current?.getBoundingClientRect().left || 0
                    }
                    hidePopup={hidePopup}
                />
            ) : (
                <NavigationItem data={item} onClick={onClick} />
            )}
            {highlightActiveItem && isActive && (
                <div className={b('slider-container')}>
                    <div className={b('slider')} />
                </div>
            )}
        </li>
    );
};
