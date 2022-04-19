import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Media, {MediaAllProps} from '../Media';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

export default {
    component: Media,
    title: `${COMPONENTS}/${MEDIA}/Media`,
} as Meta;

const DefaultTemplate: Story<MediaAllProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <Media {...args} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const DataLensDarkTheme = DefaultTemplate.bind({});

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

DataLensDarkTheme.args = {
    dataLens: {
        id: 'zqx9je64n9bws',
        theme: 'dark',
    },
};
