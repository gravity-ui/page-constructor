import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {BlockType, MediaBlockModel} from '../../../models';
import Media from '../MediaContent';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    title: 'Компоненты/Media',
    component: Media,
} as Meta;

const DefaultTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ThemeTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const VideoTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const DataLensTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const Theme = ThemeTemplate.bind({});
export const Video = VideoTemplate.bind({});
export const DataLens = DataLensTemplate.bind({});
export const DataLensWithTheme = DataLensTemplate.bind({});

Default.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, сколько потратили и на что',
    description:
        'Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
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
};

Theme.args = {
    type: BlockType.MediaBlock,
    direction: 'media-content',
    title: 'Вы всегда знаете, сколько потратили и на что',
    description:
        'Тарифы Yandex.Cloud подойдут как высоконагруженным сервисам больших компаний, так и небольшим проектам со скромными требованиями.Платите только за используемые ресурсы или зарезервируйте определенный объём на 1 или 3 года и сэкономьте до 49%. Следить за расходами можно прямо в консоли управления.',
    media: {
        system: {
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
        system: {
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
