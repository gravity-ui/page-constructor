import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import FullWidthBackground, {FullWidthBackgroundProps} from '../FullWidthBackground';
import {COMPONENTS} from '../../../constants';

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

Default.args = {
    style: {
        backgroundColor: '#3a74ff',
    },
    theme: 'default',
};

Rounded.args = {
    style: {
        backgroundColor: '#3a74ff',
    },
    theme: 'rounded',
};
