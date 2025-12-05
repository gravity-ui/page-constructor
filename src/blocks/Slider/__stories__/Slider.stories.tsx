import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {BannerCardModel, BasicCardModel, SliderBlockModel} from '../../../models';
import Slider, {SliderBlock, SliderProps} from '../Slider';

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
} as Meta;

const DefaultTemplate: StoryFn<SliderBlockModel> = (args) => {
    const transformedArgs = blockTransform(args) as SliderProps;

    return (
        <div style={{padding: '64px'}}>
            <SliderBlock {...transformedArgs} />
        </div>
    );
};

const SlidesToShowTemplate: StoryFn<SliderBlockModel> = (args) => {
    const transformedArgs1 = blockTransform({
        ...args,
        title: data.slidesToShow.one.title,
        slidesToShow: data.slidesToShow.one.slidesToShow,
        children: data.banners.content.children as BannerCardModel[],
    }) as SliderProps;

    const transformedArgs2 = blockTransform({
        ...args,
        title: data.slidesToShow.two.title,
        slidesToShow: data.slidesToShow.two.slidesToShow,
        children: data.default.content.children as BasicCardModel[],
    }) as SliderProps;

    const transformedArgs3 = blockTransform({
        ...args,
        title: data.slidesToShow.three.title,
        slidesToShow: data.slidesToShow.three.slidesToShow,
        children: data.default.content.children as BasicCardModel[],
    }) as SliderProps;

    const transformedArgs4 = blockTransform({
        ...args,
        title: data.slidesToShow.four.title,
        slidesToShow: data.slidesToShow.four.slidesToShow,
        children: data.default.content.children as BasicCardModel[],
    }) as SliderProps;

    return (
        <div style={{padding: 64, display: 'flex', gap: 20, flexDirection: 'column'}}>
            <SliderBlock {...transformedArgs1} />
            <SliderBlock {...transformedArgs2} />
            <SliderBlock {...transformedArgs3} />
            <SliderBlock {...transformedArgs4} />
        </div>
    );
};

export const Default = DefaultTemplate.bind({});
export const QuoteCards = DefaultTemplate.bind({});
export const Banners = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});
export const WithoutArrows = DefaultTemplate.bind({});
export const WithoutDots = DefaultTemplate.bind({});
export const SlidesToShow = SlidesToShowTemplate.bind({});

Default.args = data.default.content as SliderBlockModel;
QuoteCards.args = data.quoteCards.content as SliderBlockModel;
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
