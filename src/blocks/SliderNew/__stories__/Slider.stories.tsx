import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor';
import {BannerCardModel, BasicCardModel, SliderNewBlockModel} from '../../../models';
import Slider from '../Slider';

import data from './data.json';

export default {
    title: 'Lab/SliderNew',
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

const DefaultTemplate: StoryFn<SliderNewBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const SlidesToShowTemplate: StoryFn<SliderNewBlockModel> = (args) => (
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
export const QuoteCards = DefaultTemplate.bind({});
export const Banners = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});
export const WithoutArrows = DefaultTemplate.bind({});
export const WithoutDots = DefaultTemplate.bind({});
export const SlidesToShow = SlidesToShowTemplate.bind({});

Default.args = data.default.content as SliderNewBlockModel;
QuoteCards.args = data.quoteCards.content as SliderNewBlockModel;
Banners.args = data.banners.content as SliderNewBlockModel;
AutoPlay.args = {
    ...data.default.content,
    ...data.autoPlay.content,
} as SliderNewBlockModel;
WithoutArrows.args = {
    ...data.default.content,
    ...data.withoutArrows.content,
} as SliderNewBlockModel;
WithoutDots.args = {
    ...data.default.content,
    ...data.withoutDots.content,
} as SliderNewBlockModel;

SlidesToShow.args = {
    ...data.default.content,
} as SliderNewBlockModel;
