import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {SliderBlockModel} from '../../../models';
import Slider from '../Slider';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

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

export const Default = DefaultTemplate.bind({});
export const NewsCards = DefaultTemplate.bind({});
export const TutorialCards = DefaultTemplate.bind({});
export const QuoteCards = DefaultTemplate.bind({});
export const Banners = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});

Default.args = data.default.content as SliderBlockModel;
NewsCards.args = data.newsCards.content as SliderBlockModel;
TutorialCards.args = data.tutorialCards.content as SliderBlockModel;
QuoteCards.args = data.quoteCards.content as SliderBlockModel;
Banners.args = data.banners.content as SliderBlockModel;
AutoPlay.args = data.autoPlay.content as SliderBlockModel;
