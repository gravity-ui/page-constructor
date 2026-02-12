import {Meta, StoryFn} from '@storybook/react';

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

const VideoTemplate: StoryFn<MediaAllProps> = (args) => {
    const videoProps = args.video;

    return (
        <div style={{maxWidth: '500px'}}>
            <Media
                {...args}
                video={
                    videoProps
                        ? {
                              ...videoProps,
                              onVideoEnd: () => {
                                  console.log('Video has ended, onVideoEnd callback has fired');
                              },
                          }
                        : undefined
                }
            />
        </div>
    );
};

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = VideoTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const DataLensDarkTheme = DefaultTemplate.bind({});
export const Iframe = IframeTemplate.bind({});

Image.args = data.image.content as MediaAllProps;

ImageSlider.args = data.imageSlider.content as MediaAllProps;

Video.args = data.video.content as MediaAllProps;

Youtube.args = data.youtube.content as MediaAllProps;

DataLens.args = data.dataLens.content as MediaAllProps;

DataLensDarkTheme.args = data.dataLensDarkTheme.content as MediaAllProps;

Iframe.args = data.iframe.content as MediaAllProps;
