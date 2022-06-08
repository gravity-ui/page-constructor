import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import yfm from '@doc-tools/transform';

import CardLayout from '../CardLayout';
import {BlockType, CardLayoutBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/CardLayout',
    component: CardLayout,
} as Meta;

const DefaultTemplate: Story<CardLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const PaddingsTemplate: Story<CardLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    title: 'Карточки с фоном paddingBottom = s',
                    children: args.children?.map((child) => ({...child, paddingBottom: 's'})),
                },
                {
                    ...args,
                    title: 'Карточки с фоном paddingBottom = m',
                    children: args.children?.map((child) => ({...child, paddingBottom: 'm'})),
                },
                {
                    ...args,
                    title: 'Карточки с фоном paddingBottom = l',
                    children: args.children?.map((child) => ({...child, paddingBottom: 'l'})),
                },
                {
                    ...args,
                    title: 'Карточки с фоном paddingBottom = xl',
                    children: args.children?.map((child) => ({...child, paddingBottom: 'xl'})),
                },
            ],
        }}
    />
);

export const CardsWithImage = DefaultTemplate.bind([]);
export const CardsWithImageFullScreen = DefaultTemplate.bind([]);
export const CardsWithImageAllProps = DefaultTemplate.bind([]);
export const BackgroundCardsPaddings = PaddingsTemplate.bind([]);
export const BackgroundCardsBackgroundColor = DefaultTemplate.bind([]);
export const BackgroundCardsContentSizes = DefaultTemplate.bind([]);
export const BackgroundCardsThemes = DefaultTemplate.bind([]);

CardsWithImage.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Карточки с фото',
    children: [
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей&nbsp;Башкеев',
            description: yfm('CEO, руководитель&nbsp;платформы').result.html,
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей Башкеев',
            description: yfm('CEO, руководитель&nbsp;платформы').result.html,
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей Башкеев',
            description: yfm('CEO, руководитель&nbsp;платформы').result.html,
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/card-with-image/bashkeev.png',
            title: 'Алексей Башкеев',
            description: yfm('CEO, руководитель&nbsp;платформы').result.html,
            links: [{link: 'https://yandex.ru', title: 'LinkedIn'}],
        },
    ],
    colSizes: {
        all: 12,
        xl: 3,
        md: 4,
        sm: 6,
    },
};
CardsWithImage.storyName = 'Карточки с фото';
CardsWithImageFullScreen.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Карточки с фото Fullscreen',
    description:
        'Выбор инфраструктуры во многом определяет возможности бизнеса — доступность, надежность, масштабируемость. Yandex.Cloud — технологическая платформа',
    colSizes: {
        all: 12,
        md: 4,
        sm: 6,
    },
    children: [
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
            title: 'Перераспределение нагрузки',
            description: yfm(
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            ).result.html,
            fullScreen: true,
            border: true,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Автомасштабирование по нагрузке',
            description: yfm(
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            ).result.html,
            fullScreen: true,
            border: true,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Автомасштабирование по размеру',
            description: yfm(
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            ).result.html,
            fullScreen: true,
            border: true,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Автоматическое восстановление',
            description: yfm(
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            ).result.html,
            fullScreen: true,
            border: true,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Репликация данных',
            description: yfm(
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            ).result.html,
            fullScreen: true,
            border: true,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/ydb-assets/scheme.png',
            title: 'Секционирование',
            description: yfm(
                'Вы сами определяете число ядер процессора и объём памяти и контролируете стоимость виртуальной машины.',
            ).result.html,
            fullScreen: true,
            border: true,
        },
    ],
};
CardsWithImageFullScreen.storyName = 'Карточки с фото Fullscreen';
CardsWithImageAllProps.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Карточки с фото со всем возможным наполнением',
    description:
        'Выбор инфраструктуры во многом определяет возможности бизнеса — доступность, надежность, масштабируемость. Yandex.Cloud — технологическая платформа',
    colSizes: {
        all: 12,
        md: 4,
        sm: 6,
    },
    children: [
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
            title: {
                text: 'Программа содействия образованию и науке в области Computer Science',
                url: 'https://yandex.ru',
                textSize: 's',
            },
            fullScreen: true,
            border: true,
            links: [
                {
                    link: '/security',
                    title: 'Заполнить форму',
                    theme: 'back',
                    arrow: true,
                },
                {
                    link: '#',
                    title: 'Подробнее',
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
                {
                    text: 'Связаться с нами',
                    theme: 'outlined',
                    url: '/#contact-form',
                },
            ],
            description: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
            title: 'Перераспределение нагрузки',
            fullScreen: true,
            border: true,
            links: [
                {
                    link: '/security',
                    title: 'Заполнить форму',
                    theme: 'back',
                    arrow: true,
                },
                {
                    link: '#',
                    title: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
            ],
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
            description: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
        },
        {
            type: BlockType.CardWithImage,
            image: 'https://storage.yandexcloud.net/ydb-www-prod-site-assets/clients/jaeger-new.png',
            title: 'Перераспределение нагрузки',
            fullScreen: true,
            border: true,
            links: [
                {
                    link: '/security',
                    title: 'Заполнить форму',
                    theme: 'back',
                    arrow: true,
                },
                {
                    link: '#',
                    title: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
            ],
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
            description: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
        },
    ],
};
CardsWithImageAllProps.storyName = 'Карточки с фото со всем возможным наполнением';

BackgroundCardsPaddings.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Карточки с фоном paddingBottom = s',
    animated: false,
    children: [
        {
            type: BlockType.BackgroundCard,
            title: 'Концепция безопасности',
            text: yfm(
                'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
            ).result.html,
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
                alt: 'card-background',
                disableCompress: true,
            },
            url: '#',
            paddingBottom: 's',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Что мы делаем для безопасности',
            text: yfm(
                'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
            ).result.html,
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
                alt: 'card-background',
                disableCompress: true,
            },
            url: '#',
            paddingBottom: 's',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Соответствие стандартам',
            text: yfm(
                'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
            ).result.html,
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0003.png',
                alt: 'card-background',
                disableCompress: true,
            },
            url: '#',
            paddingBottom: 's',
        },
    ],
};
BackgroundCardsBackgroundColor.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Карточки с заливкой фона цветом',
    animated: false,
    children: [
        {
            type: BlockType.BackgroundCard,
            title: 'Концепция безопасности',
            text: yfm(
                'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
            ).result.html,
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            backgroundColor: '#4680ff',
            theme: 'dark',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Что мы делаем для безопасности',
            text: yfm(
                'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
            ).result.html,
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            backgroundColor: '#262626',
            theme: 'dark',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Соответствие стандартам',
            text: yfm(
                'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
            ).result.html,
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0003.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            backgroundColor: '#eef2f8',
        },
    ],
};
BackgroundCardsBackgroundColor.storyName = 'Карточки с заливкой фона цветом';
BackgroundCardsContentSizes.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Карточки с разным размером контента',
    children: [
        {
            type: BlockType.BackgroundCard,
            title: 'Размер l',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
            links: [
                {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                {
                    url: '/security',
                    text: 'Читать далее',
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
                {
                    text: 'Связаться с нами',
                    theme: 'outlined',
                    url: '/#contact-form',
                },
            ],
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
                alt: 'card-background',
                disableCompress: true,
            },
            size: 'l',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Размер s - по умолчанию',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
            links: [
                {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                {
                    url: '/security',
                    text: 'Читать далее',
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
                {
                    text: 'Связаться с нами',
                    theme: 'outlined',
                    url: '/#contact-form',
                },
            ],
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
                alt: 'card-background',
                disableCompress: true,
            },
        },
    ],
};
BackgroundCardsContentSizes.storyName = 'Карточки с разным размером контента';
BackgroundCardsThemes.args = {
    type: BlockType.CardLayoutBlock,
    title: 'Темы карточек',
    children: [
        {
            type: BlockType.BackgroundCard,
            title: 'Theme = dark',
            text: 'Мы открыты в отношении наших обязательств и нашей ответственности за защиту и управление данными клиента в облаке.',
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0003.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            theme: 'dark',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Theme = light',
            text: 'Защита конфиденциальности информации, размещенной в облаке, данных и сервисов клиентов — наша важнейшая задача и ключевой приоритет.',
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            theme: 'light',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Theme = default',
            text: 'Мы постоянно совершенствуем процессы информационной безопасности, механизмы создания и эксплуатации наших сервисов, чтобы соответствовать не только федеральным, но и мировым стандартам.',
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            url: '#',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Theme = dark',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
            links: [
                {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                {
                    url: '/security',
                    text: 'Читать далее',
                    theme: 'normal',
                    arrow: true,
                },
            ],
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
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0003.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            theme: 'dark',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Theme = light',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
            links: [
                {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                {
                    url: '/security',
                    text: 'Читать далее',
                    theme: 'normal',
                    arrow: true,
                },
            ],
            buttons: [
                {
                    text: 'Подключиться',
                    theme: 'monochrome',
                    url: 'https://console.cloud.yandex.${tld}/',
                },
                {
                    text: 'Связаться с нами',
                    theme: 'outlined',
                    url: '/#contact-form',
                },
            ],
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0002.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
            theme: 'light',
        },
        {
            type: BlockType.BackgroundCard,
            title: 'Theme = default',
            text: yfm(
                '**Yandex.Cloud — публичная облачная платформа**, которая [предоставляет](https://ya.com) корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.',
            ).result.html,
            additionalInfo: yfm(
                'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
            ).result.html,
            links: [
                {
                    url: '/security',
                    text: 'Подробнее',
                    theme: 'normal',
                    arrow: true,
                },
                {
                    url: '/security',
                    text: 'Читать далее',
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
                {
                    text: 'Связаться с нами',
                    theme: 'outlined',
                    url: '/#contact-form',
                },
            ],
            background: {
                src: 'https://storage.cloud-preprod.yandex.net/berdysheva-test/bg_card_0001.png',
                alt: 'card-background',
                disableCompress: true,
            },
            paddingBottom: 's',
        },
    ],
};
BackgroundCardsThemes.storyName = 'Темы карточек';
