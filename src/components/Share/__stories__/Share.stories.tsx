import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {configure as uikitConfigure, Lang as UIKitLang} from '@gravity-ui/uikit';

import Share, {ShareProps} from '../Share';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Share,
    title: `${COMPONENTS}/Share`,
} as Meta;

uikitConfigure({lang: UIKitLang.En});

const DefaultTemplate: Story<ShareProps> = (args) => <Share {...args} />;

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = data.default.content as ShareProps;
CustomTitle.args = data.customTitle.content as ShareProps;
