import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, MediaBlockModel} from '../../../models';
import Media from '../MediaContent';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Блоки/Media',
    component: Media,
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
    title: 'Вы всегда знаете, <a href="#">сколько потратили</a> и на что',
    description:
        'Тарифы <a href="#">Yandex.Cloud</a> подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
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

Theme.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, сколько потратили и на что',
    description:
        'Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
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
        'Узнайте, как как реализовать архитектуру обработки больших данных на базе управляемых сервисов Yandex.Cloud.',
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
        'Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
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
        'Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
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
