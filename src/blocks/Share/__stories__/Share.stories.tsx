import React from 'react';

import {Lang as UIKitLang, configure as uikitConfigure} from '@gravity-ui/uikit';
import {Meta, Story} from '@storybook/react/types-6-0';

import {PageConstructor} from '../../../containers/PageConstructor';
import {BLOCKS} from '../../../demo/constants';
import {ShareBLockModel, ShareBlockProps} from '../../../models';
import Share from '../Share';

import data from './data.json';

export default {
    component: Share,
    title: `${BLOCKS}/Share`,
} as Meta;

uikitConfigure({lang: UIKitLang.En});

const DefaultTemplate: Story<ShareBLockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = data.default.content as ShareBlockProps;
CustomTitle.args = data.customTitle.content as ShareBlockProps;
