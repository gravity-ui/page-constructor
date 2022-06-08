import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import {CARDS, COMPONENTS} from '../../../demo/constants';
import Quote from '../Quote';
import {QuoteProps} from '../../../models';

export default {
    title: `${COMPONENTS}/${CARDS}/Quote`,
    component: Quote,
    args: {
        border: 'shadow',
        theme: 'light',
    },
    argTypes: {color: {control: 'color'}},
} as Meta;

const DefaultTemplate: Story<QuoteProps> = (args) => <Quote {...args} />;

export const Default = DefaultTemplate.bind({});
export const BorderLine = DefaultTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});

Default.args = {
    text: 'Благодаря широкому выбору управляемых сервисов и их удобной интеграции друг с другом команда разработки сконцентрировалась на процессах и целях, доверив обслуживание сервисов Yandex Cloud',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-cover-1.png',
    url: 'https://cloud.yandex.ru/cases/kazanexpress',
    author: {
        avatar: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-yuri-1.jpg',
        firstName: 'Юрий',
        secondName: 'Гаврилин',
        description: 'руководитель отдела Анализа Данных KazanExpress',
    },
    logo: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress.svg',
};

BorderLine.args = {
    text: 'Благодаря широкому выбору управляемых сервисов и их удобной интеграции друг с другом команда разработки сконцентрировалась на процессах и целях, доверив обслуживание сервисов Yandex Cloud',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-cover-1.png',
    url: 'https://cloud.yandex.ru/cases/kazanexpress',
    author: {
        avatar: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-yuri-1.jpg',
        firstName: 'Юрий',
        secondName: 'Гаврилин',
        description: 'руководитель отдела Анализа Данных KazanExpress',
    },
    logo: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress.svg',
    border: 'line',
};

DarkTheme.args = {
    text: 'Благодаря широкому выбору управляемых сервисов и их удобной интеграции друг с другом команда разработки сконцентрировалась на процессах и целях, доверив обслуживание сервисов Yandex Cloud',
    image: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-cover-1.png',
    url: 'https://cloud.yandex.ru/cases/kazanexpress',
    author: {
        avatar: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress-yuri-1.jpg',
        firstName: 'Юрий',
        secondName: 'Гаврилин',
        description: 'руководитель отдела Анализа Данных KazanExpress',
    },
    logo: 'https://storage.yandexcloud.net/cloud-www-assets/cases/kazanexpress/kazanexpress.svg',
    theme: 'dark',
    color: '#2b3e6a',
};
