import React, {Fragment} from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, HeaderBlockModel} from '../../../models';
import Header from '../Header';
import yfm from '@doc-tools/transform';
import {PageConstructor} from '../../../containers/PageConstructor';

export default {
    title: 'Блоки/Header',
    component: Header,
    args: {
        image: undefined,
        video: undefined,
        background: undefined,
        breadcrumbs: undefined,
        offset: 'default',
        theme: 'light',
        verticalOffset: 'm',
    },
    argTypes: {
        overtitle: {control: 'text'},
    },
} as Meta;

const DefaultTemplate: Story<HeaderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SizeTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={'Заголовок width "S"'} width="s" />
        <DefaultTemplate {...args} title={'Заголовок width "M"'} width="m" />
        <DefaultTemplate {...args} title={'Заголовок width "L"'} width="l" />
    </Fragment>
);

const ImageTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={'Текст размер "M" (картинка "S")'} width="m" />
        <DefaultTemplate {...args} title={'Текст размер "S" (картинка "M")'} width="s" />
    </Fragment>
);

const VerticalOffsetTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={'Вертикальные отступы  "S"'} verticalOffset="s" />
        <DefaultTemplate {...args} title={'Вертикальные отступы "M"'} verticalOffset="m" />
        <DefaultTemplate {...args} title={'Вертикальные отступы "L"'} verticalOffset="l" />
        <DefaultTemplate {...args} title={'Вертикальные отступы "XL"'} verticalOffset="l" />
    </Fragment>
);

const MediaTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={'Блок с Картинкой или Видео (Медиа)'} />
        <DefaultTemplate
            {...args}
            title={'Блок с Картинкой или Видео (Медиа) с подложкой на всю ширину'}
            background={{...args.background, fullWidth: true}}
        />
    </Fragment>
);

const BackgroundTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={'Бэкграунд картинка (цветная подложка на мобилке)'} />
        <DefaultTemplate
            {...args}
            title={'Бэкграунд картинка + цветная подложка на всю ширину'}
            background={{
                ...args.background,
                light:
                    args.background && 'light' in args.background
                        ? {
                              ...args.background?.light,
                              fullWidth: true,
                          }
                        : {},
                dark:
                    args.background && 'dark' in args.background
                        ? {
                              ...args.background?.dark,
                              fullWidth: true,
                          }
                        : {},
            }}
        />
    </Fragment>
);

const BreadCrumbsTemplate: Story<HeaderBlockModel> = (args) => (
    <Fragment>
        <DefaultTemplate {...args} title={'Хлебные крошки в светлой теме'} />
        <DefaultTemplate
            {...args}
            title={'Хлебные крошки в тёмной теме'}
            theme="dark"
            background={{...args.background, color: '#262626'}}
        />
    </Fragment>
);

export const Default = DefaultTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Image = ImageTemplate.bind({});
export const VerticalOffset = VerticalOffsetTemplate.bind({});
export const Media = MediaTemplate.bind({});
export const Background = BackgroundTemplate.bind({});
export const ThemeDark = DefaultTemplate.bind({});
export const Breadcrumbs = BreadCrumbsTemplate.bind({});

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
    ],
};

Size.args = {
    type: BlockType.HeaderBlock,
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
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
    description:
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    verticalOffset: 'm',
    image: {
        light: {
            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/ecommerce-big.png',
        },
        dark: {
            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/retail-banner.png',
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

VerticalOffset.args = {
    type: BlockType.HeaderBlock,
    description:
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    verticalOffset: 's',
    image: {
        light: {
            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/ecommerce-big.png',
        },
        dark: {
            src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/retail-banner.png',
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

Media.args = {
    type: BlockType.HeaderBlock,
    description:
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    verticalOffset: 'xl',
    background: {
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main.png',
        video: {
            src: [
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main_video.webm',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main_video.ogv',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main_video.mp4',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/mobile.png',
            ],
        },
        color: '#f5f5f5',
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

Background.args = {
    type: BlockType.HeaderBlock,
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    verticalOffset: 'm',
    background: {
        light: {
            url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-2.png',
            color: '#E3EBFF',
        },
        dark: {
            url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-1.png',
            color: '#000',
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

ThemeDark.args = {
    type: BlockType.HeaderBlock,
    title: 'Партнёрская программа Yandex Cloud Professionals',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    verticalOffset: 'm',
    theme: 'dark',
    background: {
        color: '#262626',
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
    theme: 'light',
    description: yfm(
        'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
    ).result.html,
    width: 's',
    verticalOffset: 'm',
    background: {
        url: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg-2.png',
        color: '#E3EBFF',
        fullWidth: false,
    },
    buttons: [
        {
            text: 'Подключиться',
            theme: 'action',
            url: 'https://console.cloud.yandex.${tld}/',
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
