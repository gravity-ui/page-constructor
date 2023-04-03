import React, {Fragment} from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {TitleProps} from 'src/models';

import {COMPONENTS} from '../../../demo/constants';
import Title, {TitleFullProps} from '../Title';

import data from './data.json';

export default {
    component: Title,
    title: `${COMPONENTS}/Title`,
} as Meta;

const DefaultTemplate: Story<TitleFullProps> = (args) => <Title {...args} />;

const SizeTemplate: Story<TitleFullProps> = (args) => (
    <Fragment>
        <Title {...args} textSize="xs" />
        <Title {...args} textSize="s" />
        <Title {...args} textSize="m" />
        <Title {...args} textSize="l" resetMargin={true} />
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const WithLink = SizeTemplate.bind({});
export const ResetMargin = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});

Default.args = data.default.content as TitleProps;
WithLink.args = data.withLink.content as TitleProps;
ResetMargin.args = data.resetMargin.content as TitleProps;
Size.args = data.default.content as TitleProps;
