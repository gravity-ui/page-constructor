import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor, PageConstructorProps} from '../PageConstructor';

import {CustomBlocksTemplate} from './components/CustomBlocksTemplate';

import data from './data.json';

export default {
    title: 'Containers/PageConstructor',
    component: PageConstructor,
} as Meta;

const DefaultTemplate: StoryFn<PageConstructorProps> = (args) => <PageConstructor {...args} />;

export const Default = DefaultTemplate.bind({});
export const WithNavigation = DefaultTemplate.bind({});
export const WithFullWidthBackgroundMedia = DefaultTemplate.bind({});
export const Branded = DefaultTemplate.bind({});
export const CustomBlocks = CustomBlocksTemplate.bind({});

Default.args = data.default as PageConstructorProps;

WithNavigation.args = {
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
} as PageConstructorProps;

CustomBlocks.args = data.custom as unknown as PageConstructorProps;
