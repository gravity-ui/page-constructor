import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Author from '../Author';
import {AuthorProps, AuthorType} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Author,
    title: `${COMPONENTS}/Author`,
} as Meta;

const avatarNoWebp = 'https://storage.cloud-preprod.yandex.net/cloud-www-community-images/oleg.png';
const avatarWebp =
    'https://storage.cloud-preprod.yandex.net/cloud-www-assets/blog-assets/ru/posts/2022/oleg.png';
const author = {
    firstName: 'Олег',
    secondName: 'Коверзнев',
    description:
        'В Яндексе с июля 2017 года. Возглавляет команду, которая формирует стратегию развития бизнеса Yandex.Cloud и выстраивает работу с клиентами и партнерами.',
    avatar: avatarWebp,
};

const DefaultTemplate: Story<AuthorProps> = (args) => <Author {...args} />;

export const Default = DefaultTemplate.bind({});
export const TextUnderImage = DefaultTemplate.bind({});
export const NoWebpInAvatar = DefaultTemplate.bind({});

Default.args = {
    author,
    type: AuthorType.Line,
};

TextUnderImage.args = {
    author,
    type: AuthorType.Column,
};

NoWebpInAvatar.args = {
    author: {
        ...author,
        avatar: avatarNoWebp,
    },
    type: AuthorType.Line,
};
