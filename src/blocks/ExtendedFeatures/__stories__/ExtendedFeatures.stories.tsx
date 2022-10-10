import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {ExtendedFeaturesBlockModel, ExtendedFeaturesProps} from '../../../models';
import ExtendedFeatures from '../ExtendedFeatures';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

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
export const Default = DefaultTemplate.bind({});
export const WithLabel = DefaultTemplate.bind({});

Default.args = data.default.content as ExtendedFeaturesProps;
WithLabel.args = data.withLabel.content as ExtendedFeaturesProps;
