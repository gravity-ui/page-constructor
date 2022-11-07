import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

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

const DefaultArgs = {
    ...data.common,
    description: yfm(data.common.description).result.html,
};

DefaultTheme.args = {
    ...DefaultArgs,
    ...data.defaultTheme.content,
    items: data.defaultTheme.content.items.map((item) => {
        return {
            ...item,
            text: yfm(item.text).result.html,
        };
    }),
} as PromoFeaturesProps;
GreyTheme.args = {
    ...DefaultArgs,
    ...data.greyTheme.content,
    items: data.greyTheme.content.items.map((item) => {
        return {
            ...item,
            text: yfm(item.text).result.html,
        };
    }),
} as PromoFeaturesProps;
