import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {MediaBlockModel, MediaBlockProps} from '../../../models';
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
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const Theme = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});
export const DataLensWithTheme = DefaultTemplate.bind({});

Default.args = data.default.content as MediaBlockProps;
Theme.args = data.theme.content as MediaBlockProps;
Video.args = data.video.content as MediaBlockProps;
ImageSlider.args = data.imageSlider.content as MediaBlockProps;
DataLens.args = data.dataLens.content as MediaBlockProps;
DataLensWithTheme.args = data.dataLensWithTheme.content as MediaBlockProps;
