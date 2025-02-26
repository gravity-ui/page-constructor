import {Meta, StoryFn} from '@storybook/react';

import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {HeaderSliderBlockModel, HeaderSliderBlockProps} from '../../../models';
import HeaderSlider from '../HeaderSlider';

import data from './data.json';

export default {
    title: 'Blocks/HeaderSlider',
    component: HeaderSlider,
    args: {
        dots: true,
        disclaimer: undefined,
        randomOrder: false,
        adaptive: true,
    },
    argTypes: {
        autoplay: {control: 'number'},
    },
} as Meta;

const DefaultTemplate: StoryFn<HeaderSliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const AutoPlayTemplate: StoryFn<HeaderSliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const AutoPlay = AutoPlayTemplate.bind({});
export const WithDifferentSlidesThemes = DefaultTemplate.bind({});
export const WithDifferentSlidesThemesAutoPlay = AutoPlayTemplate.bind({});

Default.args = data.default.content as HeaderSliderBlockProps;
WithDifferentSlidesThemes.args = data.withDifferentSlidesTheme.content as HeaderSliderBlockProps;
AutoPlay.args = {
    ...data.autoPlay.content,
    items: data.default.content.items,
} as HeaderSliderBlockProps;
WithDifferentSlidesThemesAutoPlay.args = {
    ...data.autoPlay.content,
    items: data.withDifferentSlidesTheme.content.items,
} as HeaderSliderBlockProps;
