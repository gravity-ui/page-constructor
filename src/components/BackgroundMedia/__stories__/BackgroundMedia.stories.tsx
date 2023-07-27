import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {BackgroundMediaProps} from '../../../models';
import BackgroundMedia from '../BackgroundMedia';

import data from './data.json';

export default {
    component: BackgroundMedia,
    title: 'Components/Pics, video, DataLens/BackgroundMedia',
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<BackgroundMediaProps> = (args) => (
    <div style={{maxWidth: '1400px', position: 'relative'}}>
        <BackgroundMedia {...args} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});

Image.args = data.image.content;
Video.args = data.video.content;
