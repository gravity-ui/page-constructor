import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {QuoteProps} from '../../../models';
import Quote from '../Quote';

import data from './data.json';

export default {
    title: 'Components/Cards/Quote',
    component: Quote,
    args: {
        border: 'shadow',
        theme: 'light',
    },
    argTypes: {color: {control: 'color'}},
} as Meta;

const DefaultTemplate: StoryFn<QuoteProps> = (args) => (
    <div style={{maxWidth: '1248px'}}>
        <Quote {...args} />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

Default.args = data.default.content as QuoteProps;
BorderLine.args = {
    ...data.default.content,
    ...data.borderLine.content,
} as QuoteProps;
DarkTheme.args = data.darkTheme.content as QuoteProps;
