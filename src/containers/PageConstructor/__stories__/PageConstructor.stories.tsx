import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {CONTAINERS} from '../../../demo/constants';
import {PageConstructor, PageConstructorProps} from '../PageConstructor';

import data from './data.json';

export default {
    title: `${CONTAINERS}/PageConstructor`,
    component: PageConstructor,
} as Meta;

const DefaultTemplate: Story<PageConstructorProps> = (args) => <PageConstructor {...args} />;

const WithFootnotesTemplate: Story<PageConstructorProps> = (args) => <PageConstructor {...args} />;

const NavigationTemplate: Story<PageConstructorProps> = (args) => <PageConstructor {...args} />;

const WithFullWidthBackgroundMediaTemplate: Story<PageConstructorProps> = (args) => (
    <PageConstructor {...args} />
);

export const Default = DefaultTemplate.bind({});
export const WithFootnotes = WithFootnotesTemplate.bind({});
export const Navigation = NavigationTemplate.bind({});
export const WithFullWidthBackgroundMedia = WithFullWidthBackgroundMediaTemplate.bind({});

Default.args = data.default as PageConstructorProps;
WithFootnotes.args = {
    content: {
        ...data.default.content,
        footnotes: data.withFootnotes.footnotes,
    },
} as PageConstructorProps;
Navigation.args = {
    content: {
        blocks: data.default.content.blocks,
    },
    navigation: data.navigation,
} as PageConstructorProps;
WithFullWidthBackgroundMedia.args = {
    content: {
        blocks: data.default.content.blocks,
        background: data.withFullWidthBackgroundMedia.background,
    },
} as PageConstructorProps;
