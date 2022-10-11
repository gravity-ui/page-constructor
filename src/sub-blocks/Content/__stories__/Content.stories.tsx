import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Content from '../Content';
import {ContentBlockProps, ClassNameProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';
import yfm from '@doc-tools/transform';

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

const defaultArgs = {
    title: data.default.content.title,
    text: yfm(data.default.content.text).result.html,
    additionalInfo: yfm(data.default.content.additionalInfo).result.html,
    links: data.default.content.links,
    buttons: data.default.content.buttons,
};

Default.args = {
    ...defaultArgs,
} as ContentBlockProps;

SizeS.args = {
    ...defaultArgs,
    ...data.sizeS.content,
} as ContentBlockProps;

Centered.args = {
    ...defaultArgs,
    ...data.centered.content,
} as ContentBlockProps;

Light.args = {
    ...defaultArgs,
    ...data.light.content,
} as ContentBlockProps;

Dark.args = {
    ...defaultArgs,
    ...data.dark.content,
} as ContentBlockProps;
