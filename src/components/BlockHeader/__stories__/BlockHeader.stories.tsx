import {Meta, Story} from '@storybook/react/types-6-0';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import React from 'react';

import BlockHeader, {BlockHeaderProps} from '../BlockHeader';
import {COMPONENTS, HEADERS} from '../../../constants';

export default {
    component: BlockHeader,
    title: `${COMPONENTS}/${HEADERS}/BlockHeader`,
} as Meta;

const DefaultTemplate: Story<BlockHeaderProps & ClassNameProps> = (args) => (
    <BlockHeader {...args} />
);

export const Default = DefaultTemplate.bind({});
export const TitleLink = DefaultTemplate.bind({});
export const CustomTitle = DefaultTemplate.bind({});

Default.args = {
    title: 'Yandex Cloud',
    description:
        'Облачная платформа, где каждый может создавать и совершенствовать свои цифровые сервисы, используя инфраструктуру и уникальные технологии <a href="#">Яндекса</a>.',
};

TitleLink.args = {
    title: {
        text: 'Заголовок-ссылка',
        textSize: 's',
        url: '#',
        onClick: () => null,
    },
    description:
        'Облачная платформа, где каждый может создавать и совершенствовать свои цифровые сервисы, используя инфраструктуру и уникальные технологии <a href="#">Яндекса</a>.',
};

CustomTitle.args = {
    title: {
        text: 'Заголовок',
        textSize: 's',
        url: '#',
        custom: <i>Какой-то ReactNode</i>,
        onClick: () => null,
    },
    description:
        'Облачная платформа, где каждый может создавать и совершенствовать свои цифровые сервисы, используя инфраструктуру и уникальные технологии <a href="#">Яндекса</a>.',
};
