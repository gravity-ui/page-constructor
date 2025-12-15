import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {MediaBlockModel, MediaBlockProps} from '../../../models';
import Media from '../Media';

import data from './data.json';

export default {
    title: 'Blocks/Media',
    component: Media,
} as Meta;

const DefaultTemplate: StoryFn<MediaBlockModel> = (args) => (
    <Media {...(blockTransform(args) as MediaBlockProps)} />
);

const VariablesTemplate: StoryFn<Record<number, MediaBlockModel>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '96px'}}>
                <Media {...(blockTransform(arg) as MediaBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const ContentVariables = VariablesTemplate.bind([]);
export const ImageSlider = DefaultTemplate.bind({});
export const Video = VariablesTemplate.bind([]);
export const DataLens = DefaultTemplate.bind({});
export const Size = VariablesTemplate.bind([]);
export const Direction = VariablesTemplate.bind([]);
export const WithoutShadowDeprecated = DefaultTemplate.bind({});
export const WithoutShadow = DefaultTemplate.bind({});
export const WithBorder = DefaultTemplate.bind({});
export const Iframe = VariablesTemplate.bind([]);
export const EnhancedTitle = VariablesTemplate.bind([]);

Default.args = data.default as MediaBlockModel;

ContentVariables.args = [
    {additionalInfo: data.common.additionalInfo},
    {links: data.common.links},
    {buttons: data.common.buttons},
    {list: data.common.list, links: data.common.links},
    {
        media: {
            light: {
                ...data.default.media.light,
                fullscreen: true,
            },
            dark: {
                ...data.default.media.dark,
                fullscreen: true,
            },
        },
    },
].map((content) => ({...data.default, ...content})) as MediaBlockModel[];
ContentVariables.parameters = {
    controls: {
        include: Object.keys(ContentVariables.args),
    },
};

ImageSlider.args = {
    ...data.default,
    ...data.imageSlider,
} as MediaBlockProps;

Video.args = [
    {title: data.video.staticWithAutoPlay.title, media: data.video.staticWithAutoPlay.media},
    {
        title: data.video.videoWithAutoPlayCustomControlsWithPlayPauseButton.title,
        media: data.video.videoWithAutoPlayCustomControlsWithPlayPauseButton.media,
    },
    {
        title: data.video.staticWithControls.title,
        media: data.video.staticWithControls.media,
    },
    {
        title: data.video.videoWithPreview.title,
        media: data.video.videoWithPreview.media,
    },
    {
        title: data.video.videoWithPreviewAndCustomControlsWithMuteButton.title,
        media: data.video.videoWithPreviewAndCustomControlsWithMuteButton.media,
    },
    {title: data.video.youtube.title, media: data.video.youtube.media},
].map((content) => ({...data.default, ...content})) as MediaBlockModel[];
Video.parameters = {
    controls: {
        include: Object.keys(Video.args),
    },
};

DataLens.args = {
    ...data.default,
    ...data.dataLens.content,
} as MediaBlockProps;

Size.args = [
    {title: data.size.defaultMediaTitle},
    {largeMedia: true, title: data.size.largeMediaTitle},
    {mediaOnly: true, description: undefined, title: data.size.mediaOnlyTitle},
].map((content) => ({...data.default, ...content})) as MediaBlockModel[];
Size.parameters = {
    controls: {
        include: Object.keys(Size.args),
    },
};

Direction.args = [
    {title: data.direction.defaultDirectionTitle},
    {title: data.direction.ReverseDirectionTitle, direction: 'media-content'},
].map((content) => ({...data.default, ...content})) as MediaBlockModel[];
Direction.parameters = {
    controls: {
        include: Object.keys(Direction.args),
    },
};

WithoutShadowDeprecated.args = {
    ...data.default,
    ...data.withoutShadow.content,
    disableShadow: true,
} as MediaBlockProps;

WithoutShadow.args = {
    ...data.default,
    ...data.withoutShadow.content,
    border: 'none',
} as MediaBlockProps;

WithBorder.args = {
    ...data.default,
    ...data.withoutShadow.content,
    border: 'line',
} as MediaBlockProps;

Iframe.args = [
    {...data.iframe.default.content, title: data.size.defaultMediaTitle},
    {...data.iframe.default.content, largeMedia: true, title: data.size.largeMediaTitle},
    {
        ...data.iframe.default.content,
        mediaOnly: true,
        description: undefined,
        title: data.size.mediaOnlyTitle,
    },
    {...data.iframe.withoutMargins.content, title: data.iframe.withoutMargins.defaultMediaTitle},
    {
        ...data.iframe.withoutMargins.content,
        largeMedia: true,
        title: data.iframe.withoutMargins.largeMediaTitle,
    },
    {
        ...data.iframe.withoutMargins.content,
        mediaOnly: true,
        description: undefined,
        title: data.iframe.withoutMargins.mediaOnlyTitle,
    },
].map((content) => ({...data.default, ...content})) as MediaBlockModel[];
Iframe.parameters = {
    controls: {
        include: Object.keys(Iframe.args),
    },
};

EnhancedTitle.args = [
    data.enhancedTitle.largeClickable,
    {
        ...data.enhancedTitle.interactiveWithIcon,
        title: {
            ...data.enhancedTitle.interactiveWithIcon.title,
            onClick: () => alert('Media title clicked!'),
        },
    },
].map((content) => ({
    ...data.default,
    ...data.enhancedTitle.largeClickable,
    ...content,
})) as MediaBlockModel[];
EnhancedTitle.parameters = {
    controls: {
        include: Object.keys(EnhancedTitle.args),
    },
};
