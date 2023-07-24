import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import FullWidthBackground, {FullWidthBackgroundProps} from '../FullWidthBackground';

import data from './data.json';

export default {
    component: FullWidthBackground,
    title: 'Components/FullWidthBackground',
} as Meta;

const DefaultTemplate: StoryFn<FullWidthBackgroundProps> = (args) => (
    <div style={{height: '100px'}}>
        <FullWidthBackground {...args}>Children</FullWidthBackground>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Rounded = DefaultTemplate.bind({});

Default.args = data.default.content as FullWidthBackgroundProps;
Rounded.args = data.rounded.content as FullWidthBackgroundProps;
