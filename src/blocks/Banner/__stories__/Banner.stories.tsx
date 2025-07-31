import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {BannerBlockModel, BannerBlockProps} from '../../../models';
import Banner from '../Banner';

import data from './data.json';

export default {
    title: 'Blocks/Banner',
    component: Banner,
} as Meta;

const DefaultTemplate: StoryFn<BannerBlockModel> = (args) => (
    <Banner {...(blockTransform(args) as BannerBlockProps)} />
);

export const Default = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

Default.args = data.default.content as BannerBlockModel;
DarkTheme.args = data.darkTheme.content as BannerBlockModel;
