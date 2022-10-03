import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Title, {TitleFullProps} from '../Title';
import {COMPONENTS} from '../../../demo/constants';
import {TitleProps} from 'src/models';

import data from './data.json';

export default {
    component: Title,
    title: `${COMPONENTS}/Title`,
} as Meta;

const DefaultTemplate: Story<TitleFullProps> = (args) => <Title {...args} />;

export const Default = DefaultTemplate.bind({});
export const WithLink = DefaultTemplate.bind({});
export const ResetMargin = DefaultTemplate.bind({});

Default.args = data.default.content as TitleProps;
WithLink.args = data.withLink.content as TitleProps;
ResetMargin.args = data.resetMargin.content as TitleProps;
