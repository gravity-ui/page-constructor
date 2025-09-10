import {Meta, StoryFn} from '@storybook/react';

import {MediaProps} from '../../../models';
import Media, {MediaAllProps} from '../Media';

import data from './data.json';

export default {
    component: Media,
    title: 'Components/Pics, video, DataLens/Media',
} as Meta;

const DefaultTemplate: StoryFn<MediaAllProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <Media {...args} />
    </div>
);

const IframeTemplate: StoryFn<MediaAllProps> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <h1>Iframe with margins (default)</h1>
        <Media {...args} />
        <h1>Iframe without margins</h1>
        <Media {...args} margins={false} />
    </div>
);

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const DataLensDarkTheme = DefaultTemplate.bind({});
export const Iframe = IframeTemplate.bind({});

Image.args = data.image.content;
ImageSlider.args = data.imageSlider.content;
Video.args = {
    ...data.video.content,
    video: {
        ...data.video.content.video,
        onVideoEnd: () => {
            console.log('Video has ended, onVideoEnd callback has fired');
        },
    },
};
Youtube.args = data.youtube.content;
DataLens.args = data.dataLens.content;
DataLensDarkTheme.args = data.dataLensDarkTheme.content as MediaProps;
Iframe.args = data.iframe.content as MediaProps;
