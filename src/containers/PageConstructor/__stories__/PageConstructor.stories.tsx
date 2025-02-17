import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor, PageConstructorProps} from '../PageConstructor';

import data from './data.json';
import landingData from './landingData.json';

export default {
    title: 'Containers/PageConstructor',
    component: PageConstructor,
} as Meta;

const DefaultTemplate: StoryFn<PageConstructorProps> = (args) => <PageConstructor {...args} />;

const WithFullWidthBackgroundMediaTemplate: StoryFn<PageConstructorProps> = (args) => (
    <PageConstructor {...args} />
);

export const Default = DefaultTemplate.bind({});
export const withNavigation = DefaultTemplate.bind({});
export const WithFullWidthBackgroundMedia = WithFullWidthBackgroundMediaTemplate.bind({});
export const Branded = DefaultTemplate.bind({});
export const Landing = DefaultTemplate.bind({});

Default.args = data.default as PageConstructorProps;
withNavigation.args = {
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
Branded.args = {
    ...data.default,
    isBranded: true,
};
Landing.args = {
    content: {
        ...landingData.landing.content,
    },
    navigation: landingData.landing.navigation,
};
