import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Features from '../Features';
import {FeaturesProps} from '../../../models/constructor-items/deprecated';
import {COMPONENTS} from '../../../demo/constants';
import yfm from '@doc-tools/transform';

export default {
    component: Features,
    title: `${COMPONENTS}/Features`,
} as Meta;

const DefaultTemplate: Story<FeaturesProps> = (args) => <Features {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    items: [
        yfm('Один').result.html,
        yfm('Два').result.html,
        yfm('Три').result.html,
        yfm('Четыре').result.html,
    ],
    border: true,
};
