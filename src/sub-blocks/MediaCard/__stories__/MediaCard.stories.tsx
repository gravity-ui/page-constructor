import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {MediaCardModel, MediaCardProps} from '../../../models';
import MediaCard from '../MediaCard';

import data from './data.json';

export default {
    component: MediaCard,
    title: 'Components/Cards/MediaCard',
    argTypes: {
        color: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<MediaCardModel> = (args) => {
    const transformedArgs = blockTransform(args) as MediaCardProps;
    return (
        <div style={{maxWidth: '500px'}}>
            <MediaCard {...transformedArgs} />
        </div>
    );
};

export const Image = DefaultTemplate.bind({});
export const ImageSlider = DefaultTemplate.bind({});
export const Video = DefaultTemplate.bind({});
export const Youtube = DefaultTemplate.bind({});
export const DataLens = DefaultTemplate.bind({});

Image.args = data.image.content;
ImageSlider.args = data.imageSlider.content;
Video.args = data.video.content;
Youtube.args = data.youtube.content;
DataLens.args = data.dataLens.content;
