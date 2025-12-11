import {Meta, StoryFn} from '@storybook/react';

import {blockTransform} from '../../../../.storybook/utils';
import {
    BannerCardProps,
    BasicCardProps,
    QuoteProps,
    SliderBlockModel,
    SubBlockModels,
} from '../../../models';
import {BannerCard, BasicCard, Quote} from '../../../sub-blocks';
import Slider, {SliderBlock, SliderProps} from '../Slider';

import data from './data.json';

export default {
    title: 'Blocks/Slider',
    component: Slider,
} as Meta;

const renderChild = (childArgs: SubBlockModels, index?: number) => {
    const childProps = blockTransform(childArgs);
    switch (childArgs.type) {
        case 'basic-card':
            return <BasicCard key={index} {...(childProps as BasicCardProps)} />;
        case 'banner-card':
            return <BannerCard key={index} {...(childProps as BannerCardProps)} />;
        case 'quote':
            return <Quote key={index} {...(childProps as QuoteProps)} />;
        default:
            return null;
    }
};

const DefaultTemplate: StoryFn<SliderBlockModel> = (args) => {
    const {children = [], ...restArgs} = args;
    const transformedArgs = blockTransform(restArgs) as SliderProps;

    return (
        <div style={{padding: 64, maxWidth: 1264}}>
            <SliderBlock {...transformedArgs}>{children.map(renderChild)}</SliderBlock>
        </div>
    );
};

const SlidesToShowTemplate: StoryFn<Record<string, SliderBlockModel>> = (args) => (
    <div style={{padding: 64, maxWidth: 1264}}>
        {Object.entries(args)
            .map(([key, item]) => {
                if (typeof item !== 'object' || item === null) {
                    return null;
                }
                const {children = [], ...restArgs} = item;
                const transformedArgs = blockTransform(restArgs) as SliderProps;

                return (
                    <div key={key} style={{display: 'flex', gap: 20, flexDirection: 'column'}}>
                        <SliderBlock {...transformedArgs}>{children.map(renderChild)}</SliderBlock>
                    </div>
                );
            })
            .filter(Boolean)}
    </div>
);

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

const SLIDES_TO_SHOW: Record<string, SliderBlockModel> = {
    one_slide: {
        ...data.default.content,
        title: data.slidesToShow.one.title,
        slidesToShow: data.slidesToShow.one.slidesToShow,
        children: data.banners.content.children,
    } as SliderBlockModel,
    two_slides: {
        ...data.default.content,
        title: data.slidesToShow.two.title,
        slidesToShow: data.slidesToShow.two.slidesToShow,
        children: data.default.content.children,
    } as SliderBlockModel,
    three_slides: {
        ...data.default.content,
        title: data.slidesToShow.three.title,
        slidesToShow: data.slidesToShow.three.slidesToShow,
        children: data.default.content.children,
    } as SliderBlockModel,
    four_slides: {
        ...data.default.content,
        title: data.slidesToShow.four.title,
        slidesToShow: data.slidesToShow.four.slidesToShow,
        children: data.default.content.children,
    } as SliderBlockModel,
};

SlidesToShow.args = SLIDES_TO_SHOW;
SlidesToShow.parameters = {
    controls: {
        include: Object.keys(SLIDES_TO_SHOW),
    },
};
