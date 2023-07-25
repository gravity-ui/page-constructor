import React from 'react';

import {Lang as UIKitLang, configure as uikitConfigure} from '@gravity-ui/uikit';
import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {ShareBLockModel, ShareBlockProps} from '../../../models';
import Share from '../Share';

import data from './data.json';

export default {
    component: Share,
    title: 'Blocks/Share',
} as Meta;

uikitConfigure({lang: UIKitLang.En});

const DefaultTemplate: StoryFn<ShareBLockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = data.default.content as ShareBlockProps;
CustomTitle.args = data.customTitle.content as ShareBlockProps;
