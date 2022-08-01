import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';
import yfm from '@doc-tools/transform';

import Simple from '../Simple';
import {BlockType, SubBlockType, SimpleBlockModel} from '../../../models';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

export default {
    component: Simple,
    title: 'Блоки/Simple',
} as Meta;

const DefaultTemplate: Story<SimpleBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    type: BlockType.SimpleBlock,
    title: {
        text: 'Посмотрите вебинар',
    },
    description: yfm(
        'Яндекс [представил](https://ya.com) Yandex.Cloud в 2018 году. С момента запуска платформа выросла вдвое. Причём не только по суммарному доходу, но и по клиентской базе: ежедневно наши сервисы используют более 10 тысяч компаний.',
    ).result.html,
    children: [
        {
            type: SubBlockType.MediaCard,
            dataLens: 'zqx9je64n9bws',
        },
        {
            type: SubBlockType.Divider,
        },
        {
            type: SubBlockType.MediaCard,
            youtube:
                'https://www.youtube.com/watch?v=FHUnirudntU&list=PL1x4ET76A10awoGRia_EmYnEU_RPmRsRz&index=5A',
            previewImg:
                'https://storage.yandexcloud.net/cloud-www-assets/solutions/e-commerce/retail-video.png',
        },
    ],
};
