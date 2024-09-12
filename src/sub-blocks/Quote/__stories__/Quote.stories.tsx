import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransformInline} from '../../../../.storybook/utils';
import {QuoteProps, QuoteType} from '../../../models';
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
const QuoteTypesTemplate: StoryFn<QuoteProps> = (args) => (
    <div style={{maxWidth: '1248px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Quote {...args} quoteType={QuoteType.Chevron} />
        <Quote {...args} quoteType={QuoteType.EnglishDouble} />
    </div>
);
export const Default = DefaultTemplate.bind({});
export const QuoteTypes = QuoteTypesTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    yfmText: yfmTransformInline(data.default.content.yfmText),
} as QuoteProps;

Default.args = DefaultArgs;
QuoteTypes.args = DefaultArgs;
BorderLine.args = {
    ...DefaultArgs,
    ...data.borderLine.content,
} as QuoteProps;
DarkTheme.args = data.darkTheme.content as QuoteProps;
