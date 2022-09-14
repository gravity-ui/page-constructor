import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, InfoBlockModel} from '../../../models';
import Info from '../Info';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/Info',
    component: Info,
} as Meta;

const DefaultTemplate: Story<InfoBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Deprecated = DefaultTemplate.bind({});
export const Light = DefaultTemplate.bind({});
export const Dark = DefaultTemplate.bind({});

Deprecated.args = {
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

Light.args = {
    type: BlockType.InfoBlock,
    theme: 'light',
    backgroundColor: '#eef3fe',
    rightContent: {
        title: {text: 'Полезные ссылки', url: '#'},
        text: '<p>Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.</p>',
        additionalInfo:
            '<p>Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более <a href="#">10 тысяч компаний</a>.</p>',
        links: [
            {
                url: '/security',
                text: 'Подробнее',
                theme: 'normal',
                arrow: true,
            },
            {
                url: '/security',
                text: 'Еще подробнее',
                theme: 'normal',
                arrow: true,
            },
            {
                url: '/security',
                text: 'Читать',
                theme: 'normal',
                arrow: true,
            },
        ],
        buttons: [
            {
                text: 'Подключиться',
                theme: 'action',
                url: 'https://console.cloud.yandex.${tld}/',
            },
        ],
    },
    leftContent: {
        title: 'Готовы подключиться?',
        text: '<p>Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.</p>',
        additionalInfo:
            '<p>Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более <a href="#">10 тысяч компаний</a>.</p>',
        links: [
            {
                url: '/security',
                text: 'Подробнее',
                theme: 'normal',
                arrow: true,
            },
            {
                url: '/security',
                text: 'Подробнее',
                theme: 'normal',
            },
        ],
        buttons: [
            {
                text: 'Подключиться',
                theme: 'action',
                url: 'https://console.cloud.yandex.${tld}/',
            },
            {
                text: 'Связаться с нами',
                theme: 'action',
                url: '/#contact-form',
            },
            {
                text: 'Связаться с нами',
                theme: 'action',
                url: '/#contact-form',
            },
        ],
    },
};

Dark.args = {
    type: BlockType.InfoBlock,
    theme: 'dark',
    rightContent: {
        title: {text: 'Полезные ссылки', url: '#'},
        text: '<p>Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.</p>',
        additionalInfo:
            '<p>Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более <a href="#">10 тысяч компаний</a>.</p>',
        links: [
            {
                url: '/security',
                text: 'Подробнее',
                theme: 'normal',
                arrow: true,
            },
            {
                url: '/security',
                text: 'Еще подробнее',
                theme: 'normal',
                arrow: true,
            },
            {
                url: '/security',
                text: 'Читать',
                theme: 'normal',
                arrow: true,
            },
        ],
        buttons: [
            {
                text: 'Подключиться',
                theme: 'outlined-contrast',
                url: 'https://console.cloud.yandex.${tld}/',
            },
            {
                text: 'Связаться с нами',
                theme: 'raised',
                url: '/#contact-form',
            },
            {
                text: 'Связаться с нами',
                theme: 'outlined-contrast',
                url: '/#contact-form',
            },
        ],
    },
    leftContent: {
        title: 'Готовы подключиться?',
        text: '<p>Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.</p>',
        additionalInfo:
            '<p>Яндекс представил <a href="#">Yandex.Cloud</a> в 2018 году. С момента запуска платформа выросла вдвое.</p>',
        links: [
            {
                url: '/security',
                text: 'Подробнее',
                theme: 'normal',
                arrow: true,
            },
            {
                url: '/security',
                text: 'Подробнее',
                theme: 'normal',
            },
        ],
        buttons: [
            {
                text: 'Подключиться',
                theme: 'outlined-contrast',
                url: 'https://console.cloud.yandex.${tld}/',
            },
            {
                text: 'Связаться с нами',
                theme: 'raised',
                url: '/#contact-form',
            },
            {
                text: 'Связаться с нами',
                theme: 'outlined-contrast',
                url: '/#contact-form',
            },
        ],
    },
};
