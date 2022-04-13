import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import MediaCard from '../MediaCard';
import {MediaCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../constants';

export default {
    component: MediaCard,
    title: `${COMPONENTS}/${CARDS}/MediaCard`,
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: Story<MediaCardProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <MediaCard {...args} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});

Image.args = {
    image: {
        src: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
        alt: 'Картинка',
        disableCompress: true,
    },
};

ImageSlider.args = {
    image: [
        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/console-main_2x.png',
        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/console-datalens-2x.png',
        'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/console-monitoring-2x.png',
    ],
};

Video.args = {
    video: {
        src: [
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.mp4',
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.webm',
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/main-calcx2.ogv',
            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/calc.png',
        ],
        loop: {start: 0},
    },
};

Youtube.args = {
    youtube:
        'https://www.youtube.com/watch?v=FHUnirudntU&list=PL1x4ET76A10awoGRia_EmYnEU_RPmRsRz&index=5A',
    previewImg:
        'https://storage.yandexcloud.net/cloud-www-assets/solutions/e-commerce/retail-video.png',
};

DataLens.args = {
    dataLens: 'zqx9je64n9bws',
};
