import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BannerBlockModel, BannerBlockProps} from '../../../models';
import Banner from '../Banner';
import {PageConstructor} from '../../../containers/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Banner',
    component: Banner,
    args: {
        theme: 'light',
    },
} as Meta;

const DefaultTemplate: Story<BannerBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const WithThemeTemplate: Story<BannerBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithTheme = WithThemeTemplate.bind({});

Default.args = data.default.content as BannerBlockProps;
WithTheme.args = data.withTheme.content as BannerBlockProps;
