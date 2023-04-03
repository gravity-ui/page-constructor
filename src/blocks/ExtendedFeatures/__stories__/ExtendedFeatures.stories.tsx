import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {yfmTransform} from '../../../../.storybook/utils';
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
        description: undefined,
    },
} as Meta;

const DefaultTemplate: Story<ExtendedFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const extendedFeaturesItems = (items: ExtendedFeaturesItem[]) => {
    return items.map((item) => ({
        ...item,
        text: item.text && yfmTransform(item.text),
        additionalInfo: item.additionalInfo && yfmTransform(item.additionalInfo),
    }));
};

const ColSizesTemplate: Story<ExtendedFeaturesBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    ...data.colSizes.four,
                    items: extendedFeaturesItems(
                        data.colSizes.four.items as ExtendedFeaturesItem[],
                    ),
                },
                {
                    ...args,
                    ...data.colSizes.three,
                },
                {
                    ...args,
                    ...data.colSizes.two,
                    items: extendedFeaturesItems(data.colSizes.two.items as ExtendedFeaturesItem[]),
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});
export const ColSizes = ColSizesTemplate.bind({});

Default.args = {
    ...data.default.content,
    items: extendedFeaturesItems(data.default.content.items as ExtendedFeaturesItem[]),
} as ExtendedFeaturesProps;
WithLabel.args = {
    ...data.withLabel.content,
    items: extendedFeaturesItems(data.withLabel.content.items as ExtendedFeaturesItem[]),
} as ExtendedFeaturesProps;
ColSizes.args = {
    ...data.default.content,
    items: extendedFeaturesItems(data.default.content.items as ExtendedFeaturesItem[]),
} as ExtendedFeaturesProps;
