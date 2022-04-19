import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Arrow, {ArrowProps} from '../Arrow';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Arrow,
    title: `${COMPONENTS}/Arrow`,
} as Meta;

const DefaultTemplate: Story<ArrowProps> = (args) => <Arrow {...args} />;

export const Default = DefaultTemplate.bind({});
