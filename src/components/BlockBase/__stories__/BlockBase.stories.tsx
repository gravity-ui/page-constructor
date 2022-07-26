import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import BlockBase from '../BlockBase';
import {BlockBaseProps, ClassNameProps} from '../../../models';
import {GridColumnSize} from '../../../grid';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: BlockBase,
    title: `${COMPONENTS}/BlockBase`,
} as Meta;

const DefaultTemplate: Story<BlockBaseProps & ClassNameProps> = (args) => (
    <BlockBase {...args}>
        <span>Это children</span>
    </BlockBase>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    anchor: {
        text: 'anchor text',
        url: '#',
    },
    visible: GridColumnSize.Sm,
    className: '',
    resetPaddings: false,
};
