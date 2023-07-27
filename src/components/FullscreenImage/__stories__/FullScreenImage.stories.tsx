import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import FullscreenImage, {FullscreenImageProps} from '../FullscreenImage';

import data from './data.json';

export default {
    component: FullscreenImage,
    title: 'Components/Pics, video, DataLens/FullscreenImage',
} as Meta;

const DefaultTemplate: StoryFn<FullscreenImageProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <FullscreenImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as FullscreenImageProps;
