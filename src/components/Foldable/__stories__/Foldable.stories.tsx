import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Foldable, {FoldableProps} from '../Foldable';
import {COMPONENTS} from '../../../constants';

export default {
    component: Foldable,
    title: `${COMPONENTS}/Foldable`,
} as Meta;

const DefaultTemplate: Story<FoldableProps> = (args) => <Foldable {...args}>Это children</Foldable>;

export const Default = DefaultTemplate.bind({});

Default.args = {
    isOpened: true,
};
