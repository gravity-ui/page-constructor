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
        margins: {
            control: {type: 'radio'},
            options: [undefined, 's', 'm'],
        },
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

const ContentTemplate: StoryFn<ImageCardProps> = (args) => (
    <div
        style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start'}}
    >
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} />
        </div>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} text="" />
        </div>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} text="" title="" />
        </div>
    </div>
);

const MultipleContentTemplate: StoryFn<ImageCardProps> = (args) => (
    <div>
        <ContentTemplate {...args} {...(data.margins.none as Partial<ImageCardProps>)} />
        <ContentTemplate {...args} {...(data.margins.small as Partial<ImageCardProps>)} />
        <ContentTemplate {...args} {...(data.margins.medium as Partial<ImageCardProps>)} />
    </div>
);

const BorderTemplate: StoryFn<ImageCardProps> = (args) => (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} {...(data.border.shadow as Partial<ImageCardProps>)} />
        </div>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} {...(data.border.line as Partial<ImageCardProps>)} />
        </div>
        <div style={{width: 400, margin: 20}}>
            <ImageCard {...args} {...(data.border.none as Partial<ImageCardProps>)} />
        </div>
    </div>
);

const BorderRadiusTemplate: StoryFn<ImageCardProps> = (args) => (
    <div style={{margin: 20}}>
        <h2>Default</h2>
        <MultipleTemplate {...args} />
        <h2>enableImageBorderRadius: true</h2>
        <MultipleTemplate {...args} enableImageBorderRadius />
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Margins = MultipleTemplate.bind({});
export const DirectionReverse = MultipleTemplate.bind({});
export const Content = MultipleContentTemplate.bind({});
export const BackgroundColor = MultipleTemplate.bind({});
export const Border = BorderTemplate.bind({});
export const BorderRadius = BorderRadiusTemplate.bind({});

DirectionReverse.args = {direction: 'reverse'} as Partial<ImageCardProps>;
BackgroundColor.args = {...data.backgroundColor.content};
