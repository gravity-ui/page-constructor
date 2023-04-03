import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import ToggleArrow, {ToggleArrowProps} from '../ToggleArrow';

import data from './data.json';

export default {
    component: ToggleArrow,
    title: `${COMPONENTS}/ToggleArrow`,
} as Meta;

const DefaultTemplate: Story<ToggleArrowProps> = (args) => <ToggleArrow {...args} />;

export const Horizontal = DefaultTemplate.bind({});
export const Vertical = DefaultTemplate.bind({});

Horizontal.args = data.horizontal.content as ToggleArrowProps;
Vertical.args = data.vertical.content as ToggleArrowProps;
