import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import VideoBlock, {VideoBlockProps} from '../VideoBlock';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

export default {
    component: VideoBlock,
    title: `${COMPONENTS}/${MEDIA}/VideoBlock`,
} as Meta;

const DefaultTemplate: Story<VideoBlockProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <VideoBlock {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    record: 'https://www.youtube.com/watch?v=FHUnirudntU&list=PL1x4ET76A10awoGRia_EmYnEU_RPmRsRz&index=5A',
    attributes: {color: 'white', rel: '0'},
    previewImg:
        'https://storage.yandexcloud.net/cloud-www-assets/solutions/e-commerce/retail-video.png',
    playButton: null,
    className: '',
    stream: '',
    id: '',
};
