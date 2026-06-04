import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor, PageConstructorProps} from '../PageConstructor';

import {CustomBlocksTemplate} from './components/CustomBlocksTemplate';

import data from './data.json';
import footer1Data from './footer-data/1.json';
import footer2Data from './footer-data/2.json';
import footer3Data from './footer-data/3.json';
import footer4Data from './footer-data/4.json';
import footer5Data from './footer-data/5.json';
import footer6Data from './footer-data/6.json';
import footer7Data from './footer-data/7.json';
import footer8Data from './footer-data/8.json';
import footer9Data from './footer-data/9.json';

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

export const WithFooter1 = DefaultTemplate.bind({});
WithFooter1.args = {...data.default, footerData: footer1Data} as PageConstructorProps;

export const WithFooter2 = DefaultTemplate.bind({});
WithFooter2.args = {...data.default, footerData: footer2Data} as PageConstructorProps;

export const WithFooter3 = DefaultTemplate.bind({});
WithFooter3.args = {...data.default, footerData: footer3Data} as PageConstructorProps;

export const WithFooter4 = DefaultTemplate.bind({});
WithFooter4.args = {...data.default, footerData: footer4Data} as PageConstructorProps;

export const WithFooter5 = DefaultTemplate.bind({});
WithFooter5.args = {...data.default, footerData: footer5Data} as PageConstructorProps;

export const WithFooter6 = DefaultTemplate.bind({});
WithFooter6.args = {...data.default, footerData: footer6Data} as PageConstructorProps;

export const WithFooter7 = DefaultTemplate.bind({});
WithFooter7.args = {...data.default, footerData: footer7Data} as PageConstructorProps;

export const WithFooter8 = DefaultTemplate.bind({});
WithFooter8.args = {...data.default, footerData: footer8Data} as PageConstructorProps;

export const WithFooter9 = DefaultTemplate.bind({});
WithFooter9.args = {...data.default, footerData: footer9Data} as PageConstructorProps;
