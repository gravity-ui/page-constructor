import React from 'react';
import {ItemWrapper} from 'src/context/innerContext';
import {FilterableItem} from './FilterBlock';

const withFilterableItem: ItemWrapper = (item, key, data) => {
    return 'tags' in data && data.tags ? (
        <FilterableItem tags={data.tags as string[]} key={key}>
            {item}
        </FilterableItem>
    ) : (
        item
    );
};

export default withFilterableItem;
