import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {configure as uikitConfigure, Lang as UIKitLang} from '@yandex-cloud/uikit';

import Share from '../Share';
import {PCShareSocialNetwork, ShareProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Share,
    title: `${COMPONENTS}/Share`,
} as Meta;

uikitConfigure({lang: UIKitLang.En});

const DefaultTemplate: Story<ShareProps> = (args) => <Share {...args} />;

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = {
    items: [
        PCShareSocialNetwork.Facebook,
        PCShareSocialNetwork.Vk,
        PCShareSocialNetwork.Telegram,
        PCShareSocialNetwork.Twitter,
    ],
};

CustomTitle.args = {
    title: 'Поделиться в социальных сетях',
    items: [
        PCShareSocialNetwork.Facebook,
        PCShareSocialNetwork.Vk,
        PCShareSocialNetwork.Telegram,
        PCShareSocialNetwork.Twitter,
    ],
};
