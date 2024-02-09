import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {ImageCardProps} from '../../../models';
import ImageCard from '../ImageCard';

import data from './data.json';

export default {
    component: ImageCard,
    title: 'Components/Cards/ImageCard',
    args: data.default.content,
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const DefaultTemplate: StoryFn<ImageCardProps> = (args) => (
    <div style={{width: 400, margin: 20}}>
        <ImageCard {...args} />
    </div>
);

const MultipleTemplate: StoryFn<ImageCardProps> = (args) => (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} {...(data.margins.none as Partial<ImageCardProps>)} />
        </div>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} {...(data.margins.small as Partial<ImageCardProps>)} />
        </div>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} {...(data.margins.medium as Partial<ImageCardProps>)} />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Margins = MultipleTemplate.bind({});
export const DirectionReverse = MultipleTemplate.bind({});
export const BackgroundColor = MultipleTemplate.bind({});

DirectionReverse.args = {direction: 'reverse'} as Partial<ImageCardProps>;
BackgroundColor.args = {...data.backgroundColor.content};
