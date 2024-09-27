import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransformInline} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {BannerBlockModel, BannerBlockProps} from '../../../models';
import Banner from '../Banner';

import data from './data.json';

export default {
    title: 'Blocks/Banner',
    component: Banner,
    args: {
        theme: 'light',
    },
} as Meta;

const DefaultTemplate: StoryFn<BannerBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const WithThemeTemplate: StoryFn<BannerBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const DarkTheme = WithThemeTemplate.bind({});

Default.args = {
    ...data.default.content,
    title: yfmTransformInline(data.default.content.title),
} as BannerBlockProps;
DarkTheme.args = data.darkTheme.content as BannerBlockProps;
