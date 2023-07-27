import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {PromoFeaturesBlockModel, PromoFeaturesProps} from '../../../models';
import PromoFeaturesBlock from '../PromoFeaturesBlock';

import data from './data.json';

export default {
    title: 'Blocks/PromoFeaturesBlock',
    component: PromoFeaturesBlock,
    args: {
        theme: 'default',
    },
} as Meta;

const DefaultTemplate: StoryFn<PromoFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const DefaultTheme = DefaultTemplate.bind({});
export const GreyTheme = DefaultTemplate.bind({});

const DefaultArgs = {
    ...data.common,
    description: yfmTransform(data.common.description),
};

DefaultTheme.args = {
    ...DefaultArgs,
    ...data.defaultTheme.content,
    items: data.defaultTheme.content.items.map((item) => {
        return {
            ...item,
            text: yfmTransform(item.text),
        };
    }),
} as PromoFeaturesProps;
GreyTheme.args = {
    ...DefaultArgs,
    ...data.greyTheme.content,
    items: data.greyTheme.content.items.map((item) => {
        return {
            ...item,
            text: yfmTransform(item.text),
        };
    }),
} as PromoFeaturesProps;
