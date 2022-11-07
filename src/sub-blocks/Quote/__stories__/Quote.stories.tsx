import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {CARDS, COMPONENTS} from '../../../demo/constants';
import Quote from '../Quote';
import {QuoteProps} from '../../../models';

import data from './data.json';

export default {
    title: `${COMPONENTS}/${CARDS}/Quote`,
    component: Quote,
    args: {
        border: 'shadow',
        theme: 'light',
    },
    argTypes: {color: {control: 'color'}},
} as Meta;

const DefaultTemplate: Story<QuoteProps> = (args) => (
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
