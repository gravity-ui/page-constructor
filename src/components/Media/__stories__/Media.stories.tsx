import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {MediaProps} from 'src/models';

import {COMPONENTS, MEDIA} from '../../../demo/constants';
import Media, {MediaAllProps} from '../Media';

import data from './data.json';

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

Image.args = data.image.content;
ImageSlider.args = data.imageSlider.content;
Video.args = data.video.content;
Youtube.args = data.youtube.content;
DataLens.args = data.dataLens.content;
DataLensDarkTheme.args = data.dataLensDarkTheme.content as MediaProps;
