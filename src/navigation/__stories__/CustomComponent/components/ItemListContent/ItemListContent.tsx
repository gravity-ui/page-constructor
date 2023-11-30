import React from 'react';

import {GridColumnSize, Row} from '../../../../../grid';
import {NavigationLinkItem} from '../../../../../models';
import {cn} from '../../../../../utils';
import {NavigationPopupItem} from '../NavigationPopupItem/NavigationPopupItem';

import './ItemListContent.scss';

const b = cn('item-list-content');

const popupItemSizes = {
    [GridColumnSize.Xl]: 3,
    [GridColumnSize.Md]: 4,
    [GridColumnSize.All]: 12,
};

interface ItemListContentProps {
    items: NavigationLinkItem[];
    mobile?: boolean;
}

export const ItemListContent: React.FC<ItemListContentProps> = ({items, mobile = false}) => (
    <Row className={b({mobile})}>
        {items.map((item) => (
            <NavigationPopupItem
                {...item}
                key={item.text}
                hover
                sizes={popupItemSizes}
                padding={mobile ? 's' : 'default'}
                className={b('item')}
            />
        ))}
    </Row>
);
