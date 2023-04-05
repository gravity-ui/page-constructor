import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '../../../containers/PageConstructor';
import {
    CardWithImageProps,
    FilterBlockModel,
    FilterBlockProps,
    FilterItem,
    FilterTag,
} from '../../../models';
import {CardWithImageModel} from '../../../models/constructor-items/sub-blocks';
import FilterBlock from '../FilterBlock';

import data from './data.json';

export default {
    title: 'Blocks/Filter Block',
    component: FilterBlock,
} as Meta;

const createItemList: (
    count: number,
    shared: CardWithImageProps,
    tagList: FilterTag[],
) => FilterItem[] = (count, shared, tagList) =>
    Array.from({length: count}, (_, index) => ({
        tags: [tagList[index % tagList.length].id],
        card: {
            ...shared,
            title: shared.title ? `${shared.title}&nbsp;${index + 1}` : `${index + 1}`,
        } as CardWithImageModel,
    }));

const createArgs = (overrides: Partial<FilterBlockProps>) =>
    ({
        type: 'filter-block',
        title: data.default.content.title,
        description: data.default.content.description,
        tags: data.default.filters,
        items: createItemList(6, data.default.card, data.default.filters),
        ...overrides,
    } as FilterBlockProps);

const DefaultTemplate: Story<FilterBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
Default.args = createArgs({allTag: false});

export const WithDefaultAllTag = DefaultTemplate.bind({});
WithDefaultAllTag.args = createArgs({allTag: true});

export const WithCustomAllTag = DefaultTemplate.bind({});
WithCustomAllTag.args = createArgs({allTag: 'Custom All Tag Label'});
