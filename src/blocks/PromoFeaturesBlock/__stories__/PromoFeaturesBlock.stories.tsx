import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import PromoFeaturesBlock from '../PromoFeaturesBlock';
import {PromoFeaturesBlockModel, PromoFeaturesProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/PromoFeaturesBlock',
    component: PromoFeaturesBlock,
    args: {
        theme: 'default',
    },
} as Meta;

const DefaultTemplate: Story<PromoFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const DefaultTheme = DefaultTemplate.bind({});
export const GreyTheme = DefaultTemplate.bind({});

DefaultTheme.args = data.defaultTheme.content as PromoFeaturesProps;
GreyTheme.args = data.greyTheme.content as PromoFeaturesProps;
