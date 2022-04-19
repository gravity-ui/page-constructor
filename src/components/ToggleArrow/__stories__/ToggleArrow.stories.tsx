import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ToggleArrow, {ToggleArrowProps} from '../ToggleArrow';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: ToggleArrow,
    title: `${COMPONENTS}/ToggleArrow`,
} as Meta;

const DefaultTemplate: Story<ToggleArrowProps> = (args) => <ToggleArrow {...args} />;

export const Horizontal = DefaultTemplate.bind({});
export const Vertical = DefaultTemplate.bind({});

Horizontal.args = {
    type: 'horizontal',
    iconType: 'navigation',
    size: 30,
    className: '',
};

Vertical.args = {
    type: 'vertical',
    iconType: 'default',
    size: 30,
    className: '',
};
