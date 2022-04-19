import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Title, {TitleFullProps} from '../Title';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Title,
    title: `${COMPONENTS}/Title`,
} as Meta;

const DefaultTemplate: Story<TitleFullProps> = (args) => <Title {...args} />;

export const Default = DefaultTemplate.bind({});
export const WithLink = DefaultTemplate.bind({});
export const ResetMargin = DefaultTemplate.bind({});

Default.args = {
    text: 'Заголовок',
    textSize: 'm',
};

WithLink.args = {
    text: 'Заголовок',
    textSize: 'm',
    url: '#',
};

ResetMargin.args = {
    text: 'Заголовок',
    textSize: 'm',
    resetMargin: true,
};
