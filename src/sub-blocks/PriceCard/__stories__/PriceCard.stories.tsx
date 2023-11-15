import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PriceCardProps} from '../../../models';
import PriceCard from '../PriceCard';

import data from './data.json';

export default {
    component: PriceCard,
    title: 'Components/Cards/PriceCard',
} as Meta;

const DefaultTemplate: StoryFn<PriceCardProps> = (args) => (
    <div style={{width: 400}}>
        <PriceCard {...args} list={args.list?.map((text) => yfmTransform(text)) || undefined} />
    </div>
);

const MultipleItemsTemplate: StoryFn<{items: PriceCardProps[]}> = ({items}) => (
    <div style={{display: 'flex', flexDirection: 'row'}}>
        {items.map((args, index) => (
            <div key={index} style={{width: 400, margin: '0 20px'}}>
                <PriceCard
                    {...args}
                    list={args.list?.map((text) => yfmTransform(text)) || undefined}
                />
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Link = DefaultTemplate.bind({});
export const DifferentContent = MultipleItemsTemplate.bind({});
export const Themed = MultipleItemsTemplate.bind({});

Default.args = data.default.content as PriceCardProps;
Link.args = data.link.content as PriceCardProps;
DifferentContent.args = {items: data.differentContent.content as PriceCardProps[]};
Themed.args = {items: data.themed.content as PriceCardProps[]};
