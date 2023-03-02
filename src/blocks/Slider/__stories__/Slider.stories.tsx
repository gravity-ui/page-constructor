import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {SliderBlockModel, BannerCardModel, BasicCardModel} from '../../../models';
import Slider from '../Slider';
import {PageConstructor} from '../../../containers/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Slider',
    component: Slider,
    args: {
        dots: true,
        disclaimer: undefined,
        adaptive: undefined,
        randomOrder: undefined,
    },
    argTypes: {
        description: {control: 'text'},
        autoplay: {control: 'number'},
        adaptive: {control: 'boolean'},
        randomOrder: {control: 'boolean'},
    },
} as Meta;

const DefaultTemplate: Story<SliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SlidesToShowTemplate: Story<SliderBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    title: data.slidesToShow.one.title,
                    slidesToShow: data.slidesToShow.one.slidesToShow,
                    children: data.banners.content.children as BannerCardModel[],
                },
                {
                    ...args,
                    title: data.slidesToShow.two.title,
                    slidesToShow: data.slidesToShow.two.slidesToShow,
                    children: data.default.content.children as BasicCardModel[],
                },
                {
                    ...args,
                    title: data.slidesToShow.three.title,
                    slidesToShow: data.slidesToShow.three.slidesToShow,
                    children: data.default.content.children as BasicCardModel[],
                },
                {
                    ...args,
                    title: data.slidesToShow.four.title,
                    slidesToShow: data.slidesToShow.four.slidesToShow,
                    children: data.default.content.children as BasicCardModel[],
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind({});
export const PriceDetailed = DefaultTemplate.bind({});
export const QuoteCards = DefaultTemplate.bind({});
export const Banners = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});
export const WithoutArrows = DefaultTemplate.bind({});
export const WithoutDots = DefaultTemplate.bind({});
export const SlidesToShow = SlidesToShowTemplate.bind({});

Default.args = data.default.content as SliderBlockModel;
QuoteCards.args = data.quoteCards.content as SliderBlockModel;
PriceDetailed.args = {
    ...data.quoteCards.content,
    slidesToShow: data.priceDetailed.slidesToShow,
    children: data.priceDetailed.children,
} as SliderBlockModel;
Banners.args = data.banners.content as SliderBlockModel;
AutoPlay.args = {
    ...data.default.content,
    ...data.autoPlay.content,
} as SliderBlockModel;
WithoutArrows.args = {
    ...data.default.content,
    ...data.withoutArrows.content,
} as SliderBlockModel;
WithoutDots.args = {
    ...data.default.content,
    ...data.withoutDots.content,
} as SliderBlockModel;

SlidesToShow.args = {
    ...data.default.content,
} as SliderBlockModel;
