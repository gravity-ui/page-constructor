import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import ErrorWrapper, {ErrorWrapperProps} from '../ErrorWrapper';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: ErrorWrapper,
    title: `${COMPONENTS}/ErrorWrapper`,
} as Meta;

const DefaultTemplate: Story<ErrorWrapperProps> = (args) => <ErrorWrapper {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content;
