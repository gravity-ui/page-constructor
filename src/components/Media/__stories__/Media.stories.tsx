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

const IFRAME_VARIANTS: Record<string, MediaAllProps> = {
    default: {
        ...data.iframe.content,
        margins: true,
    },
    noMargins: {
        ...data.iframe.content,
        margins: false,
    },
};

const IframeTemplate: StoryFn<Record<string, MediaAllProps>> = (args) => (
    <div style={{maxWidth: '500px'}}>
        <h1>Iframe examples</h1>

        {Object.entries(args).map(([key, item]) => (
            <div key={key} style={{marginBottom: '24px'}}>
                <h3>{key}</h3>
                <Media {...item} />
            </div>
        ))}
    </div>
);
export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = VideoTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const DataLensDarkTheme = DefaultTemplate.bind({});
export const Iframe = IframeTemplate.bind({});

Iframe.args = IFRAME_VARIANTS;

Iframe.parameters = {
    controls: {
        include: Object.keys(IFRAME_VARIANTS),
    },
};

Image.args = data.image.content as MediaAllProps;

ImageSlider.args = data.imageSlider.content as MediaAllProps;

Video.args = data.video.content as MediaAllProps;

Youtube.args = data.youtube.content as MediaAllProps;

DataLens.args = data.dataLens.content as MediaAllProps;

DataLensDarkTheme.args = data.dataLensDarkTheme.content as MediaAllProps;
