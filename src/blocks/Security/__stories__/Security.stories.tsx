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

export const DarkTheme = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});
export const CustomBackground = DefaultTemplate.bind({});

DarkTheme.args = data.darkTheme.content as SecurityBlockProps;
LightTheme.args = data.lightTheme.content as SecurityBlockProps;
CustomBackground.args = data.customBackground.content as SecurityBlockProps;
