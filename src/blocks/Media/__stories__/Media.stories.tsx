import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, MediaBlockModel} from '../../../models';
import Media from '../MediaContent';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import yfm from '@doc-tools/transform';

export default {
    title: 'Блоки/Media',
    component: Media,
    args: {
        largeMedia: false,
        mediaOnly: false,
        size: 'l',
    },
} as Meta;

const DefaultTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const Theme = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const DataLensWithTheme = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: yfm('Вы всегда знаете, [сколько потратили](#) и на что').result.html,
    description:
        '<p>Yandex.Cloud — <a href="#">публичная облачная платформа</a>, которая предоставляет корпорациям, среднему бизнесу и частным разработчикам масштабируемую инфраструктуру, сервисы хранения данных, инструменты машинного обучения и средства разработки. С этими технологиями, проверенными временем и опытом Яндекса, каждый может создавать и непрерывно совершенствовать собственные ультрасовременные цифровые сервисы и приложения.</p>',
    additionalInfo:
        '<p>Яндекс представил Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более <a href="#">10 тысяч компаний</a>.</p>',
    links: [
        {
            url: '/security',
            text: 'Подробнее',
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
    button: {
        text: 'Рассчитать стоимость',
        theme: 'outlined',
        url: '/prices#calculator',
    },
    media: {
        video: {
            src: [
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.mp4',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.webm',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.ogv',
                'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
            ],
            loop: {start: 0},
        },
        image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
    },
};

Theme.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, сколько потратили и на что',
    description:
        '<p>Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.</p>',
    media: {
        light: {
            image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
        },
        dark: {
            image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/support_x2.png',
        },
    },
    button: {
        text: 'Рассчитать стоимость',
        theme: 'outlined',
        url: '/prices#calculator',
    },
};

Video.args = {
    type: BlockType.MediaBlock,
    direction: 'content-media',
    title: 'Посмотрите вебинар',
    description:
        '<p>Узнайте, как как реализовать архитектуру обработки больших данных на базе управляемых сервисов Yandex.Cloud.</p>',
    largeMedia: true,
    media: {
        youtube:
            'https://www.youtube.com/watch?v=FHUnirudntU&list=PL1x4ET76A10awoGRia_EmYnEU_RPmRsRz&index=5A',
        previewImg:
            'https://storage.yandexcloud.net/cloud-www-assets/solutions/e-commerce/retail-video.png',
    },
};

ImageSlider.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, <a href="#">сколько потратили</a> и на что',
    description:
        'Тарифы <a href="#">Yandex.Cloud</a> подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
    media: {
        image: [
            {
                src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
                disableCompress: true,
            },
            {
                src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/support_x2.png',
            },
            {
                src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
            },
        ],
    },
    button: {
        text: 'Рассчитать стоимость',
        theme: 'outlined',
        url: '/prices#calculator',
    },
    links: [
        {
            text: 'Перейти',
            url: '#',
            arrow: true,
            theme: 'normal',
        },
        {
            text: 'Подробнее',
            url: '#',
            arrow: true,
            theme: 'normal',
        },
    ],
};

DataLens.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, сколько потратили и на что',
    description:
        '<p>Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.</p>',
    media: {
        dataLens: 'zqx9je64n9bws',
    },
    button: {
        text: 'Рассчитать стоимость',
        theme: 'outlined',
        url: '/prices#calculator',
    },
    largeMedia: true,
};

DataLensWithTheme.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, сколько потратили и на что',
    description:
        '<p>Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.</p>',
    media: {
        light: {
            dataLens: 'zqx9je64n9bws',
        },
        dark: {
            dataLens: {
                id: 'zqx9je64n9bws',
                theme: 'dark',
            },
        },
    },
    button: {
        text: 'Рассчитать стоимость',
        theme: 'outlined',
        url: '/prices#calculator',
    },
    largeMedia: true,
};
