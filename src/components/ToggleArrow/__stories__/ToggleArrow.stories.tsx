import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ToggleArrow, {ToggleArrowProps} from '../ToggleArrow';
import {COMPONENTS} from '../../../demo/constants';

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
