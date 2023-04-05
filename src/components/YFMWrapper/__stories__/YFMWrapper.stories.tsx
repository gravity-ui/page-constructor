import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import {COMPONENTS} from '../../../demo/constants';
import {ClassNameProps} from '../../../models';
import YFMWrapper, {YFMWrapperProps} from '../YFMWrapper';

import data from './data.json';

export default {
    component: YFMWrapper,
    title: `${COMPONENTS}/YFMWrapper`,
} as Meta;

const DefaultTemplate: Story<YFMWrapperProps & ClassNameProps> = (args) => <YFMWrapper {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
