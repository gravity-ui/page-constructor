import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Divider from '../Divider';
import {DividerProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: Divider,
    title: `${COMPONENTS}/Divider`,
} as Meta;

const DefaultTemplate: Story<DividerProps> = (args) => <Divider {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as DividerProps;
