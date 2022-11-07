import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Security from '../Security';
import {SecurityBlockModel, SecurityBlockProps} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Security',
    component: Security,
    args: {
        theme: 'dark',
    },
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: Story<SecurityBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});
export const CustomBackground = DefaultTemplate.bind({});

Default.args = {
    ...data.common,
    ...data.default.content,
} as SecurityBlockProps;
LightTheme.args = {
    ...data.common,
    ...data.lightTheme.content,
} as SecurityBlockProps;
CustomBackground.args = {
    ...data.common,
    ...data.customBackground.content,
    points: data.default.content.points,
} as SecurityBlockProps;
