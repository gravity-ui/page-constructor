import React from 'react';
import {ItemWrapper} from '../../context/innerContext';
import {CardLayoutItem} from './CardLayout';

export const withCardLayoutItem: ItemWrapper = (item, key, {type}, {subBlockTypes}) => {
    return subBlockTypes.includes(type) ? <CardLayoutItem key={key}>{item}</CardLayoutItem> : item;
};

export default withCardLayoutItem;
