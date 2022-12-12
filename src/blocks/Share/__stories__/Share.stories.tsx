import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {configure as uikitConfigure, Lang as UIKitLang} from '@gravity-ui/uikit';

import Share from '../Share';
import {BLOCKS} from '../../../demo/constants';
import {PageConstructor} from '../../../containers/PageConstructor';
import {ShareBLockModel, ShareBlockProps} from '../../../models';

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
