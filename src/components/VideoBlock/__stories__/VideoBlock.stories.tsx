import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import VideoBlock, {VideoBlockProps} from '../VideoBlock';

import data from './data.json';

export default {
    component: VideoBlock,
    title: 'Components/Pics, video, DataLens/VideoBlock',
} as Meta;

const DefaultTemplate: StoryFn<VideoBlockProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <VideoBlock {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
