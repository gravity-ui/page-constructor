import React from 'react';

import yfm from '@doc-tools/transform';
import {Meta, StoryFn} from '@storybook/react';

import {BasicCardProps} from '../../../models';
import {IconPosition} from '../../../models/constructor-items/sub-blocks';
import BasicCard from '../BasicCard';

import data from './data.json';

const getCardWithBorderTitle = (border: string) =>
    data.withBorder.title.replace('{{border}}', border);

const getCardWithIconTitle = (border: string) =>
    data.withIcon.title.replace('{{position}}', border);

export default {
    component: BasicCard,
    title: 'Components/Cards/BasicCard',
} as Meta;

const DefaultTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BasicCard {...args} target="_blank" />
    </div>
);

const WithIconTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon={data.withIcon.icons[0]}
                title={getCardWithIconTitle('top')}
            />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard
                {...args}
                icon={data.withIcon.icons[1]}
                iconPosition={IconPosition.Left}
                title={getCardWithIconTitle('left')}
            />
        </div>
    </div>
);

const WithBorderTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} title={getCardWithBorderTitle('shadow')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="line" title={getCardWithBorderTitle('line')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="none" title={getCardWithBorderTitle('none')} />
        </div>
    </div>
);

const WithUrlTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex', padding: '40px 0'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} title={getCardWithBorderTitle('shadow')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="line" title={getCardWithBorderTitle('line')} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} border="none" title={getCardWithBorderTitle('none')} />
        </div>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const WithIcon = WithIconTemplate.bind({});
export const WithBorder = WithBorderTemplate.bind({});
export const WithUrl = WithUrlTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    text: yfm(data.default.content.text).result.html,
};

Default.args = {
    ...data.default.content,
    ...DefaultArgs,
} as BasicCardProps;
WithIcon.args = DefaultArgs as BasicCardProps;
WithBorder.args = DefaultArgs as BasicCardProps;
WithUrl.args = {
    url: data.url,
    ...DefaultArgs,
} as BasicCardProps;
