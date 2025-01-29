import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {transformOptionalTitle, yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {
    ExtendedFeaturesBlockModel,
    ExtendedFeaturesItem,
    ExtendedFeaturesProps,
} from '../../../models';
import ExtendedFeatures from '../ExtendedFeatures';

import data from './data.json';

export default {
    title: 'Blocks/ExtendedFeatures',
    component: ExtendedFeatures,
    args: {
        colSizes: {
            all: 12,
            sm: 6,
            md: 4,
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<ExtendedFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const extendedFeaturesItems = (items: ExtendedFeaturesItem[]) => {
    return items.map((item) => ({
        ...item,
        title: transformOptionalTitle(item.title),
        list: item.list?.map((listItem) => ({
            ...listItem,
            title: transformOptionalTitle(listItem.title),
            text: listItem?.text && yfmTransform(listItem.text),
        })),
        text: item.text && yfmTransform(item.text),
        additionalInfo: item.additionalInfo && yfmTransform(item.additionalInfo),
    }));
};

const ColSizesTemplate: StoryFn<ExtendedFeaturesBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    ...data.colSizes.four,
                    title: transformOptionalTitle(data.colSizes.four.title),
                    description: yfmTransform(data.colSizes.four.description),
                    items: extendedFeaturesItems(
                        data.colSizes.four.items as ExtendedFeaturesItem[],
                    ),
                },
                {
                    ...args,
                    ...data.colSizes.three,
                    title: transformOptionalTitle(data.colSizes.three.title),
                    description: yfmTransform(data.colSizes.three.description),
                },
                {
                    ...args,
                    ...data.colSizes.two,
                    title: transformOptionalTitle(data.colSizes.two.title),
                    description: yfmTransform(data.colSizes.two.description),
                    items: extendedFeaturesItems(data.colSizes.two.items as ExtendedFeaturesItem[]),
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});
export const ColSizes = ColSizesTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    title: transformOptionalTitle(data.default.content.title),
    description: yfmTransform(data.default.content.description),
    items: extendedFeaturesItems(data.default.content.items as ExtendedFeaturesItem[]),
};

Default.args = {...DefaultArgs} as ExtendedFeaturesProps;
WithLabel.args = {
    ...DefaultArgs,
    items: extendedFeaturesItems(data.withLabel.content.items as ExtendedFeaturesItem[]),
} as ExtendedFeaturesProps;
ColSizes.args = {
    ...data.default.content,
    items: extendedFeaturesItems(data.default.content.items as ExtendedFeaturesItem[]),
} as ExtendedFeaturesProps;
