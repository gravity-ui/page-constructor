import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Content from '../Content';
import {ContentBlockProps, ClassNameProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Content,
    title: `${COMPONENTS}/Content`,
} as Meta;

const DefaultTemplate: Story<ContentBlockProps & ClassNameProps> = (args) => <Content {...args} />;

export const Default = DefaultTemplate.bind({});
export const SizeS = DefaultTemplate.bind({});
export const Centered = DefaultTemplate.bind({});
export const Light = DefaultTemplate.bind({});
export const Dark = DefaultTemplate.bind({});

Default.args = data.default.content as ContentBlockProps;
SizeS.args = data.sizeS.content as ContentBlockProps;
Centered.args = data.centered.content as ContentBlockProps;
Light.args = data.light.content as ContentBlockProps;
Dark.args = data.dark.content as ContentBlockProps;
