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
export const Default = DefaultTemplate.bind({});

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
