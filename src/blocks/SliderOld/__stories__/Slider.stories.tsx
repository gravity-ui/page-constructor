import * as React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {subBlockMap} from '../../../constructor-items';
import {SliderOldBlockModel, SubBlock} from '../../../models';
import SliderOld, {SliderOldProps} from '../SliderOld';
import {form} from '../form';

import data from './data.json';

const renderChildren = (children: SubBlock[]) =>
    children.map((child, index) => {
        const {type, ...rest} = child;
        const Component = subBlockMap[type as keyof typeof subBlockMap] as React.ComponentType;
        return Component ? <Component key={index} {...rest} /> : null;
    });

const transformAndRender = (args: SliderOldBlockModel) => {
    const transformed = blockTransform(args) as SliderOldBlockModel;
    const {type: _type, children, ...sliderProps} = transformed;
    const childElements = children ? renderChildren(children as SubBlock[]) : [];

    return <SliderOld {...(sliderProps as SliderOldProps)}>{childElements}</SliderOld>;
};

export default {
    title: 'Blocks/SliderOld (deprecated)',
    component: SliderOld,
    decorators: [
        (Story) => (
            <div style={{width: '100vw', overflow: 'hidden'}}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        inputs: form,
    },
} as Meta;

const DefaultTemplate: StoryFn<SliderOldBlockModel> = (args) => transformAndRender(args);

const SlidesToShowTemplate: StoryFn<Record<number, SliderOldBlockModel>> = (args) => (
    <div>
        {Object.values(args).map((item, index) => (
            <div key={index} style={{marginBottom: '64px'}}>
                {transformAndRender(item)}
            </div>
        ))}
    </div>
);

export const Default = DefaultTemplate.bind({});
export const QuoteCards = DefaultTemplate.bind({});
export const Banners = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});
export const WithoutArrows = DefaultTemplate.bind({});
export const WithoutDots = DefaultTemplate.bind({});
export const SlidesToShow = SlidesToShowTemplate.bind({});

Default.args = data.default as SliderOldBlockModel;

QuoteCards.args = data.quoteCards as SliderOldBlockModel;

Banners.args = data.banners as SliderOldBlockModel;

AutoPlay.args = {
    ...data.default,
    ...data.autoPlay,
} as SliderOldBlockModel;

WithoutArrows.args = {
    ...data.default,
    ...data.withoutArrows,
} as SliderOldBlockModel;

WithoutDots.args = {
    ...data.default,
    ...data.withoutDots,
} as SliderOldBlockModel;

SlidesToShow.args = data.slidesToShowItems as unknown as SliderOldBlockModel[];
SlidesToShow.parameters = {
    controls: {
        include: Object.keys(data.slidesToShowItems),
    },
};
