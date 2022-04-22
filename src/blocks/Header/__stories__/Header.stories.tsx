import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, HeaderBlockModel} from '../../../models';
import Header from '../Header';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import yfm from '@doc-tools/transform';

export default {
    title: 'Блоки/Header',
    component: Header,
} as Meta;

const DefaultTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ImageTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const BackgroundTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ThemeTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const BreadcrumbsTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const BreadcrumbsDarkTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const Image = ImageTemplate.bind({});
export const Background = BackgroundTemplate.bind({});
export const Theme = ThemeTemplate.bind({});
export const Breadcrumbs = BreadcrumbsTemplate.bind({});
export const BreadcrumbsDark = BreadcrumbsDarkTemplate.bind({});

Default.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 'l',
    verticalOffset: 'm',
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            url: '/#contact-form',
        },
    ],
};
Image.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    imageSize: 's',
    verticalOffset: 'm',
    image: {
        light: {
            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/ecommerce-big.png',
        },
        dark: {
            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/retail-banner.png',
        },
    },
    // theme: 'dark',
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            // theme: 'normal-contrast', // dark-theme
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            // theme: 'outlined-contrast', // dark-theme
            url: '/#contact-form',
        },
    ],
};
Background.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    verticalOffset: 'm',
    background: {
        light: {
            url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-2.png',
            color: '#E3EBFF',
            fullWidth: true,
        },
        dark: {
            url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-2.png',
            color: '#000',
            fullWidth: true,
        },
    },
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            url: '/#contact-form',
        },
    ],
};

Theme.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    verticalOffset: 'm',
    theme: 'dark',
    background: {
        url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-1.png',
        color: '#E3EBFF',
        fullWidth: false,
    },
    buttons: [
        {
            text: 'Подключиться',
            theme: 'normal-contrast',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined-contrast',
            url: '/#contact-form',
        },
    ],
};

Breadcrumbs.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    theme: 'default',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    verticalOffset: 'm',
    background: {
        light: {
            url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-2.png',
            color: '#E3EBFF',
            fullWidth: true,
        },
        dark: {
            url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-2.png',
            color: '#000',
            fullWidth: true,
        },
    },
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined',
            url: '/#contact-form',
        },
    ],
    breadcrumbs: {
        items: [
            {
                text: 'Blog',
                url: '#1',
            },
            {
                text: 'Services',
                url: '#2',
            },
        ],
    },
};

BreadcrumbsDark.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    theme: 'dark',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 'l',
    verticalOffset: 'm',
    background: {
        url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-1.png',
        color: '#E3EBFF',
        fullWidth: false,
    },
    buttons: [
        {
            text: 'Подключиться',
            theme: 'normal-contrast',
            url: 'https://console.cloud.yandex.${tld}/',
        },
        {
            text: 'Связаться с нами',
            theme: 'outlined-contrast',
            url: '/#contact-form',
        },
    ],
    breadcrumbs: {
        items: [
            {
                text: 'Blog',
                url: '#1',
            },
            {
                text: 'Services',
                url: '#2',
            },
        ],
    },
};
