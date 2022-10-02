import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import FullWidthBackground, {FullWidthBackgroundProps} from '../FullWidthBackground';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: FullWidthBackground,
    title: `${COMPONENTS}/FullWidthBackground`,
} as Meta;

const DefaultTemplate: Story<FullWidthBackgroundProps> = (args) => (
    <div style={{height: '100px'}}>
        <FullWidthBackground {...args}>Это children</FullWidthBackground>
    </div>
);

export const Default = DefaultTemplate.bind({});
export const Rounded = DefaultTemplate.bind({});

Default.args = data.default.content as FullWidthBackgroundProps;
Rounded.args = data.rounded.content as FullWidthBackgroundProps;
