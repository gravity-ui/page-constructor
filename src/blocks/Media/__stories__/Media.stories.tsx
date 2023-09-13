import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor';
import {
    ButtonProps,
    LinkProps,
    MediaBlockModel,
    MediaBlockProps,
    MediaProps,
} from '../../../models';
import Media from '../Media';

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

const DefaultTemplate: StoryFn<MediaBlockModel> = (args) => (
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
                {
                    ...args,
                    list: data.common.list.map((item) => {
                        return {
                            ...item,
                            text: item?.text && yfmTransform(item.text),
                        };
                    }),
                    links: data.common.links as LinkProps[],
                },
            ],
        }}
    />
);
const ImageSliderTemplate: StoryFn<MediaBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const VideoTemplate: StoryFn<MediaBlockModel> = (args) => (
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
                    title: data.video.videoWithPreviewAndCustomControlsWithMuteButton.title,
                    media: data.video.videoWithPreviewAndCustomControlsWithMuteButton
                        .media as MediaProps,
                },
                {
                    ...args,
                    title: data.video.videoWithPreviewAndCustomControlsWithPlayPauseButton.title,
                    media: data.video.videoWithPreviewAndCustomControlsWithPlayPauseButton
                        .media as MediaProps,
                },
                {
                    ...args,
                    title: data.video.videoWithPreviewAndCustomControlsWithUiKitPlayPauseButton
                        .title,
                    media: data.video.videoWithPreviewAndCustomControlsWithUiKitPlayPauseButton
                        .media as MediaProps,
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

const SizeTemplate: StoryFn<MediaBlockModel> = (args) => (
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

const DirectionTemplate: StoryFn<MediaBlockModel> = (args) => (
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
ImageSlider.args = {
    ...DefaultArgs,
    ...data.imageSlider.content,
} as MediaBlockProps;
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
