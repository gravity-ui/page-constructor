import React, {Fragment} from 'react';
import {ItemWrapper} from 'src/context/innerContext';
import {useFilterBlockContext} from './FilterBlockContext';

type FilterableItemProps = {
    tags: string[];
};

const FilterableItem: React.FC<FilterableItemProps> = ({tags, children}) => {
    const {selectedTag} = useFilterBlockContext();

    return selectedTag && tags && !tags.includes(selectedTag) ? null : (
        <Fragment>{children}</Fragment>
    );
};

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
