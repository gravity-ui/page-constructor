import React from 'react';

import yfm from '@doc-tools/transform';
import {Meta, StoryFn} from '@storybook/react';

import {BasicCardProps} from '../../../models';
import {IconPosition} from '../../../models/constructor-items/sub-blocks';
import BasicCard from '../BasicCard';

import data from './data.json';

const getCardWithBorderTitle = (border: string) =>
    data.withBorder.title.replace('{{border}}', border);

export default {
    component: BasicCard,
    title: 'Components/Cards/BasicCard',
} as Meta;

const DefaultTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{maxWidth: '400px'}}>
        <BasicCard {...args} target="_blank" />
    </div>
);

const WithIconTopTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} icon={data.withIcon.icons[0]} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} icon={data.withIcon.icons[1]} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} icon={data.withIcon.icons[2]} />
        </div>
    </div>
);

const WithIconLeftTemplate: StoryFn<BasicCardProps> = (args) => (
    <div style={{display: 'flex'}}>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} icon={data.withIcon.icons[0]} iconPosition={IconPosition.Left} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} icon={data.withIcon.icons[1]} iconPosition={IconPosition.Left} />
        </div>
        <div style={{maxWidth: '400px', padding: '0 8px'}}>
            <BasicCard {...args} icon={data.withIcon.icons[2]} iconPosition={IconPosition.Left} />
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

export const Default = DefaultTemplate.bind({});
export const WithIconTop = WithIconTopTemplate.bind({});
export const WithIconLeft = WithIconLeftTemplate.bind({});
export const WithBorder = WithBorderTemplate.bind({});

const DefaultArgs = {
    ...data.default.content,
    text: yfm(data.default.content.text).result.html,
};

Default.args = {
    ...data.default.content,
    ...DefaultArgs,
} as BasicCardProps;
WithIconTop.args = DefaultArgs as BasicCardProps;
WithIconLeft.args = DefaultArgs as BasicCardProps;
WithBorder.args = DefaultArgs as BasicCardProps;
