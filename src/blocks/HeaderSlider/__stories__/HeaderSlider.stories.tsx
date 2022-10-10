import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {HeaderSliderBlockModel, HeaderSliderBlockProps} from '../../../models';
import HeaderSlider from '../HeaderSlider';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

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

const DefaultTemplate: Story<HeaderSliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const AutoPlayTemplate: Story<HeaderSliderBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const AutoPlay = AutoPlayTemplate.bind({});

Default.args = data.default.content as HeaderSliderBlockProps;
AutoPlay.args = data.autoPlay.content as HeaderSliderBlockProps;
