import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import VideoBlock, {VideoBlockProps} from '../VideoBlock';
import {COMPONENTS, MEDIA} from '../../../demo/constants';

import data from './data.json';

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

Default.args = data.default.content;
