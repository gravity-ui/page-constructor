import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {BackgroundImageProps} from '../../../models';
import BackgroundImage from '../BackgroundImage';

import data from './data.json';

export default {
    component: BackgroundImage,
    title: 'Components/Pics, video, DataLens/BackgroundImage',
} as Meta;

const DefaultTemplate: StoryFn<BackgroundImageProps> = (args) => (
    <div style={{maxWidth: '1400px'}}>
        <BackgroundImage {...args} />
    </div>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as BackgroundImageProps;
