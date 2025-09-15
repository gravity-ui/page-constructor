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
                {
                    ...args,
                    media: {
                        light: {
                            ...data.default.content.media.light,
                            fullscreen: true,
                        },
                        dark: {
                            ...data.default.content.media.dark,
                            fullscreen: true,
                        },
                    },
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
                    title: data.video.videoWithAutoPlayCustomControlsWithPlayPauseButton.title,
                    media: data.video.videoWithAutoPlayCustomControlsWithPlayPauseButton
                        .media as MediaProps,
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

const IframeTemplate: StoryFn<MediaBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    ...data.iframe.default.content,
                    title: data.size.defaultMediaTitle,
                },
                {
                    ...args,
                    ...data.iframe.default.content,
                    largeMedia: true,
                    title: data.size.largeMediaTitle,
                },
                {
                    ...args,
                    ...data.iframe.default.content,
                    mediaOnly: true,
                    description: undefined,
                    title: data.size.mediaOnlyTitle,
                },
                {
                    ...args,
                    ...data.iframe.withoutMargins.content,
                    title: data.iframe.withoutMargins.defaultMediaTitle,
                },
                {
                    ...args,
                    ...data.iframe.withoutMargins.content,
                    largeMedia: true,
                    title: data.iframe.withoutMargins.largeMediaTitle,
                },
                {
                    ...args,
                    ...data.iframe.withoutMargins.content,
                    mediaOnly: true,
                    description: undefined,
                    title: data.iframe.withoutMargins.mediaOnlyTitle,
                },
            ],
        }}
    />
);

const EnhancedTitleTemplate: StoryFn<MediaBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    ...data.enhancedTitle.largeClickable,
                },
                {
                    ...args,
                    ...data.enhancedTitle.interactiveWithIcon,
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
export const WithoutShadowDeprecated = ImageSliderTemplate.bind({});
export const WithoutShadow = ImageSliderTemplate.bind({});
export const WithBorder = ImageSliderTemplate.bind({});
export const Iframe = IframeTemplate.bind({});
export const EnhancedTitle = EnhancedTitleTemplate.bind({});

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
WithoutShadowDeprecated.args = {
    ...DefaultArgs,
    ...data.withoutShadow.content,
    disableShadow: true,
} as MediaBlockProps;
WithoutShadow.args = {
    ...DefaultArgs,
    ...data.withoutShadow.content,
    border: 'none',
} as MediaBlockProps;
WithBorder.args = {
    ...DefaultArgs,
    ...data.withoutShadow.content,
    border: 'line',
} as MediaBlockProps;
Iframe.args = {
    ...DefaultArgs,
} as MediaBlockProps;
EnhancedTitle.args = {
    ...DefaultArgs,
    ...data.enhancedTitle.largeClickable,
} as MediaBlockProps;
