import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Features from '../Features';
import {FeaturesProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Features,
    title: `${COMPONENTS}/Features`,
} as Meta;

const DefaultTemplate: Story<FeaturesProps> = (args) => <Features {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    items: ['Один', 'Два', 'Три', 'Четыре'],
    border: true,
};
