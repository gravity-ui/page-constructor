import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {yfmTransform} from '../../../../.storybook/utils';
import {
    ButtonProps,
    LinkProps,
    MediaBlockModel,
    MediaBlockProps,
    MediaProps,
} from '../../../models';
import Media from '../Media';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Media',
    component: Media,
    args: {
        largeMedia: false,
        mediaOnly: false,
        size: 'l',
    },
} as Meta;

const DefaultTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    additionalInfo: yfmTransform(data.common.additionalInfo),
                },
                {
                    ...args,
                    links: data.common.links as LinkProps[],
                },
                {
                    ...args,
                    buttons: data.common.buttons as ButtonProps[],
                },
            ],
        }}
    />
);
const ImageSliderTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const VideoTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    title: data.video.staticWithAutoPlay.title,
                    media: data.video.staticWithAutoPlay.media,
                },
                {
                    ...args,
                    title: data.video.staticWithControls.title,
                    media: data.video.staticWithControls.media as MediaProps,
                },
                {
                    ...args,
                    title: data.video.videoWithPreview.title,
                    media: data.video.videoWithPreview.media as MediaProps,
                },
                {
                    ...args,
                    title: data.video.youtube.title,
                    media: data.video.youtube.media,
                },
            ],
        }}
    />
);

const SizeTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    title: data.size.defaultMediaTitle,
                },
                {
                    ...args,
                    largeMedia: true,
                    title: data.size.largeMediaTitle,
                },
                {
                    ...args,
                    mediaOnly: true,
                    description: undefined,
                    title: data.size.mediaOnlyTitle,
                },
            ],
        }}
    />
);

const DirectionTemplate: Story<MediaBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    title: data.direction.defaultDirectionTitle,
                },
                {
                    ...args,
                    title: data.direction.ReverseDirectionTitle,
                    direction: 'media-content',
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const ImageSlider = ImageSliderTemplate.bind({});
export const Video = VideoTemplate.bind({});
export const DataLens = ImageSliderTemplate.bind({});
export const Size = SizeTemplate.bind({});
export const Direction = DirectionTemplate.bind({});
export const WithoutShadow = ImageSliderTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    title: data.common.title,
    description: yfmTransform(data.common.description),
};

Default.args = DefaultArgs as MediaBlockProps;
ImageSlider.args = DefaultArgs as MediaBlockProps;
Video.args = DefaultArgs as MediaBlockProps;
DataLens.args = {
    ...DefaultArgs,
    ...data.dataLens.content,
} as MediaBlockProps;

Size.args = DefaultArgs as MediaBlockProps;
Direction.args = DefaultArgs as MediaBlockProps;
WithoutShadow.args = {
    ...DefaultArgs,
    ...data.withoutShadow.content,
    disableShadow: true,
} as MediaBlockProps;
