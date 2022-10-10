import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import MediaCard from '../MediaCard';
import {MediaCardProps} from '../../../models';
import {CARDS, COMPONENTS} from '../../../demo/constants';

import data from './data.json';

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

Image.args = data.image.content;
ImageSlider.args = data.imageSlider.content;
Video.args = data.video.content;
Youtube.args = data.youtube.content;
DataLens.args = data.dataLens.content;
