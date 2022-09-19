import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import PromoFeaturesBlock from '../PromoFeaturesBlock';
import {BlockType, PromoFeaturesBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor';

export default {
    title: 'Blocks/PromoFeaturesBlock',
    component: PromoFeaturesBlock,
    args: {
        theme: 'default',
    },
} as Meta;

const DefaultTemplate: Story<PromoFeaturesBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const DefaultTheme = DefaultTemplate.bind({});
export const GreyTheme = DefaultTemplate.bind({});

DefaultTheme.args = {
    type: BlockType.PromoFeaturesBlock,
    title: {
        text: 'Программа содействия образованию и науке в области Computer Science',
        url: 'https://yandex.ru',
    },
    description: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
    items: [
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            media: {
                video: {
                    src: [
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.mp4',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.webm',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.ogv',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
                    ],
                },
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            theme: 'accent',
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            theme: 'accent-light',
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            theme: 'primary',
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
    ],
};

GreyTheme.args = {
    type: BlockType.PromoFeaturesBlock,
    theme: 'grey',
    title: 'Программа содействия образованию и науке в области Computer Science',
    description: yfm(
        '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
    ).result.html,
    items: [
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            media: {
                video: {
                    src: [
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.mp4',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.webm',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.ogv',
                        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
                    ],
                },
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            theme: 'accent',
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            theme: 'accent-light',
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
        {
            title: 'Программа содействия образованию и науке в области Computer Science',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            theme: 'primary',
            media: {
                image: 'https://storage.yandexcloud.net/cloud-www-assets/mobile-app/new/app_resources_ru.png',
            },
        },
    ],
};
