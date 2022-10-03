import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BlockBase from '../BlockBase';
import {BlockBaseProps, ClassNameProps} from '../../../models';
import {COMPONENTS} from '../../../demo/constants';

import data from './data.json';

export default {
    component: BlockBase,
    title: `${COMPONENTS}/BlockBase`,
} as Meta;

const DefaultTemplate: Story<BlockBaseProps & ClassNameProps> = (args) => (
    <BlockBase {...args}>
        <span>Children</span>
    </BlockBase>
);

export const Default = DefaultTemplate.bind({});

Default.args = data.default.content as BlockBaseProps;
