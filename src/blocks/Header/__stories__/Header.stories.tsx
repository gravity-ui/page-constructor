import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {HeaderBlockModel, HeaderBlockProps} from '../../../models';
import Header from '../Header';

import data from './data.json';

const SIZES = ['l', 'm', 's'].map((width) => ({
    width,
    ...data.default,
    title: data.size.title.replace('{{size}}', width),
}));

export default {
    title: 'Blocks/Header',
    component: Header,
} as Meta;

const DefaultTemplate: StoryFn<HeaderBlockModel> = (args) => (
    <Header {...(blockTransform(args) as HeaderBlockProps)} />
);

const VariantsTemplate: StoryFn<Record<number, HeaderBlockModel>> = (args) => (
    <React.Fragment>
        {Object.values(args).map((arg, index) => (
            <div key={index} style={{marginBottom: '120px'}}>
                <Header {...(blockTransform(arg) as HeaderBlockProps)} />
            </div>
        ))}
    </React.Fragment>
);

export const Default = DefaultTemplate.bind({});
export const Size = VariantsTemplate.bind([]);
export const Centered = VariantsTemplate.bind([]);
export const Image = VariantsTemplate.bind([]);
export const VerticalOffset = VariantsTemplate.bind([]);
export const Background = VariantsTemplate.bind([]);
export const FullWithBackground = VariantsTemplate.bind([]);
export const FullWidthMediaBackground = VariantsTemplate.bind({});
export const DarkTheme = DefaultTemplate.bind({});
export const Breadcrumbs = VariantsTemplate.bind([]);
export const MediaViewFit = VariantsTemplate.bind([]);
export const VideoIframe = DefaultTemplate.bind({});

Default.args = data.default as HeaderBlockModel;

Size.args = SIZES as HeaderBlockModel[];
Size.parameters = {
    controls: {
        include: Object.keys(SIZES),
    },
};

Centered.args = SIZES.map((item) => ({...item, centered: true})) as HeaderBlockModel[];
Centered.parameters = {
    controls: {
        include: Object.keys(SIZES),
    },
};

Image.args = ['m', 's'].map((width) => ({
    ...data.default,
    width,
    ...data.image,
    title: data.image.title.replace('{{width}}', width),
})) as HeaderBlockModel[];
Image.parameters = {
    controls: {
        include: Object.keys(Image.args),
    },
};

VerticalOffset.args = ['0', 's', 'm', 'l', 'xl'].map((verticalOffset) => ({
    verticalOffset,
    ...data.default,
    ...data.image,
    width: 's',
    title: data.verticalOffset.title.replace('{{offset}}', verticalOffset),
})) as HeaderBlockModel[];
VerticalOffset.parameters = {
    controls: {
        include: Object.keys(VerticalOffset.args),
    },
};

Background.args = [
    {background: data.media.image.background, title: 'Block with image'},
    {background: data.media.video.background, title: 'Block with video'},
].map((background) => ({
    ...data.default,
    ...background,
})) as HeaderBlockModel[];
Background.parameters = {
    controls: {
        include: Object.keys(Background.args),
    },
};

FullWithBackground.args = [data.media.image.background, data.media.video.background].map(
    (background) => ({
        ...data.default,
        background: {
            light: {...background.light, fullWidth: true},
            dark: {...background.dark, fullWidth: true},
        },
    }),
) as HeaderBlockModel[];
FullWithBackground.parameters = {
    controls: {
        include: Object.keys(FullWithBackground.args),
    },
};

FullWidthMediaBackground.args = [data.media.image.background, data.media.video.background].map(
    (background) => ({
        ...data.default,
        background: {
            light: {...background.light, fullWidth: true, fullWidthMedia: true},
            dark: {...background.dark, fullWidth: true, fullWidthMedia: true},
        },
    }),
) as HeaderBlockModel[];
FullWidthMediaBackground.parameters = {
    controls: {
        include: Object.keys(FullWidthMediaBackground.args),
    },
};

DarkTheme.args = {
    ...data.default,
    ...data.themeDark,
} as HeaderBlockProps;

Breadcrumbs.args = data.breadcrumbs as HeaderBlockModel[];
Breadcrumbs.parameters = {
    controls: {
        include: Object.keys(Breadcrumbs.args),
    },
};

MediaViewFit.args = data.fit as HeaderBlockModel[];
MediaViewFit.parameters = {
    controls: {
        include: Object.keys(MediaViewFit.args),
    },
};

VideoIframe.args = {
    ...data.default,
    ...data.videoIframe,
} as HeaderBlockModel;
