import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PriceCardProps} from '../../../models';
import PriceCard from '../PriceCard';

import data from './data.json';

export default {
    component: PriceCard,
    title: 'Components/Cards/PriceCard',
    args: data.common,
    argTypes: {
        backgroundColor: {
            control: {type: 'color'},
        },
    },
} as Meta;

const transformList = (list: PriceCardProps['list']) =>
    list?.map((text) => yfmTransform(text)) || undefined;

const DefaultTemplate: StoryFn<PriceCardProps> = (args) => (
    <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
        <div style={{display: 'inline-table', width: 400, margin: 20}}>
            <PriceCard
                {...args}
                buttons={data.buttons as PriceCardProps['buttons']}
                list={transformList(args.list)}
            />
        </div>
        <div style={{display: 'inline-table', width: 400, margin: 20}}>
            <PriceCard
                {...args}
                links={data.links as PriceCardProps['links']}
                list={transformList(args.list)}
            />
        </div>
    </div>
);

const DifferentContentTemplate: StoryFn<PriceCardProps> = (args) => {
    const items = data.differentContent.content as PriceCardProps[];
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
            {items.map((itemArgs, index) => (
                <div key={index} style={{display: 'inline-table', width: 400, margin: 20}}>
                    <PriceCard {...args} {...itemArgs} list={transformList(itemArgs.list)} />
                </div>
            ))}
        </div>
    );
};

const MultipleItemsTemplate: StoryFn<PriceCardProps> = (args) => {
    const items = data.themed.content as PriceCardProps[];
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
            {items.map((itemArgs, index) => (
                <div key={index} style={{width: 400, margin: '20px'}}>
                    <PriceCard {...args} {...itemArgs} list={transformList(itemArgs.list)} />
                </div>
            ))}
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const DifferentContent = DifferentContentTemplate.bind({});
export const Themed = MultipleItemsTemplate.bind({});

Default.args = data.default.content as PriceCardProps;
