import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, InfoBlockModel} from '../../../models';
import Info from '../Info';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/Info',
    component: Info,
} as Meta;

const DefaultTemplate: Story<InfoBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.InfoBlock,
    title: 'Готовы подключиться?',
    buttons: [
        {
            text: 'Подключиться',
            theme: 'raised',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Задать вопрос',
            theme: 'outlined-contrast',
            url: '#contact-form',
        },
    ],
    sectionsTitle: 'Полезные ссылки',
    links: [
        {
            text: 'Найти партнёра',
            url: '/partners/find',
        },
        {
            text: 'Тарифы',
            url: '/prices',
        },
        {
            text: 'Чат сообщества',
            url: 'https://t.me/yandexcloudnews',
        },
    ],
};
