import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import {SocialNetwork} from '@yandex-data-ui/common';

import Share from '../Share';
import {ShareProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Share,
    title: `${COMPONENTS}/Share`,
} as Meta;

const DefaultTemplate: Story<ShareProps> = (args) => <Share {...args} />;

export const Default = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = {
    items: [
        SocialNetwork.Facebook,
        SocialNetwork.VK,
        SocialNetwork.Telegram,
        SocialNetwork.Twitter,
    ],
};

CustomTitle.args = {
    title: 'Поделиться в социальных сетях',
    items: [
        SocialNetwork.Facebook,
        SocialNetwork.VK,
        SocialNetwork.Telegram,
        SocialNetwork.Twitter,
    ],
};
