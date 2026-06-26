import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {FooterBlockModel, FooterBlockProps} from '../../../models';
import {PageConstructor, PageConstructorProps} from '../PageConstructor';

import {CustomBlocksTemplate} from './components/CustomBlocksTemplate';

import data from './data.json';
import footer1Data from './footer-data/1.json';
import footer10Data from './footer-data/10.json';
import footer11Data from './footer-data/11.json';
import footer12Data from './footer-data/12.json';
import footer13Data from './footer-data/13.json';
import footer14Data from './footer-data/14.json';
import footer15Data from './footer-data/15.json';
import footer16Data from './footer-data/16.json';
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
const getArgsWithFooter = (footerData: FooterBlockModel) =>
    ({
        ...data.default,
        footerData: blockTransform(footerData) as FooterBlockProps,
    }) as PageConstructorProps;

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
WithFooter1.args = getArgsWithFooter(footer1Data as FooterBlockModel);

export const WithFooter2 = DefaultTemplate.bind({});
WithFooter2.args = getArgsWithFooter(footer2Data as FooterBlockModel);

export const WithFooter3 = DefaultTemplate.bind({});
WithFooter3.args = getArgsWithFooter(footer3Data as FooterBlockModel);

export const WithFooter4 = DefaultTemplate.bind({});
WithFooter4.args = getArgsWithFooter(footer4Data as FooterBlockModel);

export const WithFooter5 = DefaultTemplate.bind({});
WithFooter5.args = getArgsWithFooter(footer5Data as FooterBlockModel);

export const WithFooter6 = DefaultTemplate.bind({});
WithFooter6.args = getArgsWithFooter(footer6Data as FooterBlockModel);

export const WithFooter7 = DefaultTemplate.bind({});
WithFooter7.args = getArgsWithFooter(footer7Data as FooterBlockModel);

export const WithFooter8 = DefaultTemplate.bind({});
WithFooter8.args = getArgsWithFooter(footer8Data as FooterBlockModel);

export const WithFooter9 = DefaultTemplate.bind({});
WithFooter9.args = getArgsWithFooter(footer9Data as FooterBlockModel);

export const WithFooter10 = DefaultTemplate.bind({});
WithFooter10.args = getArgsWithFooter(footer10Data as FooterBlockModel);

export const WithFooter11 = DefaultTemplate.bind({});
WithFooter11.args = getArgsWithFooter(footer11Data as FooterBlockModel);

export const WithFooter12 = DefaultTemplate.bind({});
WithFooter12.args = getArgsWithFooter(footer12Data as FooterBlockModel);

export const WithFooter13 = DefaultTemplate.bind({});
WithFooter13.args = getArgsWithFooter(footer13Data as FooterBlockModel);

export const WithFooter14 = DefaultTemplate.bind({});
WithFooter14.args = getArgsWithFooter(footer14Data as FooterBlockModel);

export const WithFooter15 = DefaultTemplate.bind({});
WithFooter15.args = getArgsWithFooter(footer15Data as FooterBlockModel);

export const WithFooter16 = DefaultTemplate.bind({});
WithFooter16.args = getArgsWithFooter(footer16Data as FooterBlockModel);
