import React from 'react';

import _ from 'lodash';

import {NavigationListProps} from '../../models';
import NavigationListItem from '../NavigationListItem/NavigationListItem';

export const NavigationList: React.FC<NavigationListProps> = ({
    className,
    itemClassName,
    items,
    ...props
}) => (
    <ul className={className}>
        {items.map((item, index) => (
            <NavigationListItem
                key={index}
                index={index}
                data={item}
                className={itemClassName}
                {...props}
            />
        ))}
    </ul>
);
