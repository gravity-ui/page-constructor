import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, HeaderSliderBlockModel} from '../../../models';
import HeaderSlider from '../HeaderSlider';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/HeaderSlider',
    component: HeaderSlider,
    args: {
        dots: true,
        arrows: false,
        disclaimer: undefined,
        randomOrder: false,
        adaptive: true,
    },
    argTypes: {
        autoplay: {control: 'number'},
    },
} as Meta;

const DefaultTemplate: Story<HeaderSliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.HeaderSliderBlock,
    autoplay: 5000,
    items: [
        {
            title: 'Партнёрская программа Yandex Cloud Professionals',
            description:
                'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
            width: 's',
            verticalOffset: 's',
            background: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main.png',
                video: {
                    loop: {
                        start: 0,
                    },
                    src: [
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main_video.webm',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main_video.ogv',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/main_video.mp4',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/mobile.png',
                    ],
                },
                height: 650,
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
        },
        {
            title: 'Yandex Scale',
            overtitle: '24 сентября',
            description:
                'Большая конференция Yandex.Cloud, где бизнес и технологии говорят на одном языке',
            width: 's',
            verticalOffset: 's',
            background: {
                url: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-visual/scale-header.svg',
                fullWidth: true,
                disableCompress: true,
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
        },
        {
            title: 'Партнёрская программа Yandex Cloud Professionals',
            description:
                'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
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
        },
        {
            title: 'Партнёрская программа Yandex Cloud Professionals',
            description:
                'Продавайте сервисы Yandex.Cloud и ежемесячно получайте партнёрскую премию от 12% до 20% потребления ваших клиентов. Получайте гранты для знакомства с сервисами Yandex.Cloud или для проведения пилотных проектов ваших клиентов.',
            width: 's',
            imageSize: 's',
            verticalOffset: 'm',
            image: {
                src: 'https://storage.cloud-preprod.yandex.net/cloud-www-assets/solutions/e-commerce/ecommerce-big.png',
            },
            // theme: 'dark',
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
        },
    ],
};
