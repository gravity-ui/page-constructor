import React from 'react';

import {NavigationListItemProps} from '../../models';
import {getItemClickHandler} from '../../utils';
import NavigationItem from '../NavigationItem/NavigationItem';

const NavigationListItem: React.FC<NavigationListItemProps> = ({
    column,
    index,
    activeItemId,
    onActiveItemChange,
    ...props
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
        <NavigationItem
            isActive={isActive}
            onClick={onClick}
            hidePopup={onActiveItemChange}
            {...props}
        />
    );
};

export default NavigationListItem;
