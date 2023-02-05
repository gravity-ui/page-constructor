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

const FullScreenTemplate: Story<Record<string, MediaCardProps>> = (args) => (
    <div>
        {Object.keys(args).map((media) => (
            <div key={media} style={{maxWidth: '500px'}}>
                <h1 style={{textTransform: 'capitalize'}}>{media}</h1>
                <MediaCard {...args[media]} fullScreen={true} />
            </div>
        ))}
    </div>
);

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const WithContent = DefaultTemplate.bind({});
export const FullScreen = FullScreenTemplate.bind({});

Image.args = data.image.content;
ImageSlider.args = data.imageSlider.content;
Video.args = data.video.content;
Youtube.args = data.youtube.content;
DataLens.args = data.dataLens.content;
WithContent.args = data.withContent.content;
FullScreen.args = {
    image: data.image.content,
    video: data.video.content,
    youtube: data.youtube.content,
};
