import {Meta, StoryFn} from '@storybook/react';

import ToggleArrow, {ToggleArrowProps} from '../ToggleArrow';

import data from './data.json';

export default {
    component: ToggleArrow,
    title: 'Components/ToggleArrow',
} as Meta;

const DefaultTemplate: StoryFn<ToggleArrowProps> = (args) => <ToggleArrow {...args} />;

export const Horizontal = DefaultTemplate.bind({});
export const Vertical = DefaultTemplate.bind({});

Horizontal.args = data.horizontal.content as ToggleArrowProps;
Vertical.args = data.vertical.content as ToggleArrowProps;
