import {Meta, StoryFn} from '@storybook/react';

import {HeaderSliderBlockProps} from '../../../models';
import HeaderSlider from '../HeaderSlider';

import data from './data.json';

export default {
    title: 'Blocks/HeaderSlider',
    component: HeaderSlider,
} as Meta;

const DefaultTemplate: StoryFn<HeaderSliderBlockProps> = (args) => {
    const {items: _items, ...config} = args;
    const configKey = JSON.stringify(config);

    return <HeaderSlider {...args} key={configKey} />;
};

export const Default = DefaultTemplate.bind({});
export const AutoPlay = DefaultTemplate.bind({});
export const WithDifferentSlidesThemes = DefaultTemplate.bind({});
export const WithDifferentSlidesThemesAutoPlay = DefaultTemplate.bind({});

Default.args = data.default as HeaderSliderBlockProps;

WithDifferentSlidesThemes.args = data.withDifferentSlidesTheme as HeaderSliderBlockProps;
WithDifferentSlidesThemes.parameters = {
    controls: {
        include: Object.keys(data.withDifferentSlidesTheme),
    },
};

AutoPlay.args = {
    ...data.autoPlay,
    items: data.default.items,
} as HeaderSliderBlockProps;
AutoPlay.parameters = {
    controls: {
        include: [...Object.keys(data.autoPlay), 'items'],
    },
};

WithDifferentSlidesThemesAutoPlay.args = {
    ...data.withDifferentSlidesTheme,
    autoplay: data.autoPlay.autoplay,
} as HeaderSliderBlockProps;
WithDifferentSlidesThemesAutoPlay.parameters = {
    controls: {
        include: [...Object.keys(data.withDifferentSlidesTheme), 'autoplay'],
    },
};
