import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';

import Filterable from '../FilterBlock';
import {
    FilterBlockModel,
    SubBlockModels,
    CardWithImageProps,
    FilterBlockProps,
} from '../../../models';
import {CardWithImageModel} from '../../../models/constructor-items/sub-blocks';
import {PageConstructor} from '../../../containers/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Filter Block',
    component: Filterable,
} as Meta;

const createCardArray: (
    count: number,
    shared: Partial<CardWithImageProps>,
    individual?: (index: number) => Partial<CardWithImageProps>,
) => SubBlockModels[] = (count, shared, individual = () => ({})) =>
    Array.from(
        {length: count},
        (_, index) => ({...shared, ...individual(index)} as CardWithImageModel),
    );

const DefaultTemplate: Story<FilterBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: 'filter-block',
    title: data.default.content.title,
    description: data.default.content.description,
    filterTags: data.default.filters,
    allTag: false,
    child: {
        type: data.default.content.type,
        children: createCardArray(
            6,
            data.default.card,
            (index): Partial<CardWithImageProps> => ({
                title: `${data.default.card.title}&nbsp;${index + 1}`,
                tags: [data.default.filters[index % data.default.filters.length].id],
            }),
        ),
    },
} as FilterBlockProps;
