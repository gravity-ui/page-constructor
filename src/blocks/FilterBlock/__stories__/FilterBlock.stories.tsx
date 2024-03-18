import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {
    FilterBlockModel,
    FilterBlockProps,
    FilterItem,
    FilterTag,
    LayoutItemModel,
    LayoutItemProps,
} from '../../../models';
import FilterBlock from '../FilterBlock';

import data from './data.json';

export default {
    title: 'Blocks/Filter Block',
    component: FilterBlock,
} as Meta;

const createItemList: (
    count: number,
    shared: LayoutItemProps,
    tagList: FilterTag[],
) => FilterItem[] = (count, shared, tagList) =>
    Array.from({length: count}, (_, index) => ({
        tags: [tagList[index % tagList.length].id],
        card: {
            ...shared,
            content: {
                title: shared.content.title
                    ? `${shared.content.title}&nbsp;${index + 1}`
                    : `${index + 1}`,
            },
        } as LayoutItemModel,
    }));

const createArgs = (overrides: Partial<FilterBlockProps>) =>
    ({
        type: 'filter-block',
        title: data.default.content.title,
        description: yfmTransform(data.default.content.description),
        tags: data.default.filters,
        items: createItemList(6, data.default.card, data.default.filters),
        ...overrides,
    } as FilterBlockProps);

const DefaultTemplate: StoryFn<FilterBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
Default.args = createArgs({allTag: false});

export const WithDefaultAllTag = DefaultTemplate.bind({});
WithDefaultAllTag.args = createArgs({allTag: true});

export const WithCustomAllTag = DefaultTemplate.bind({});
WithCustomAllTag.args = createArgs({allTag: 'Custom All Tag Label'});

export const WithThemedMedia = DefaultTemplate.bind({});
WithThemedMedia.args = createArgs({
    allTag: false,
    items: createItemList(6, data.themed.card, data.default.filters),
});
