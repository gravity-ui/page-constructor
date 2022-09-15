import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Foldable, {FoldableProps} from '../Foldable';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Foldable,
    title: `${COMPONENTS}/Foldable`,
} as Meta;

const DefaultTemplate: Story<FoldableProps> = (args) => (
    <Foldable {...args}>
        <div>Это children</div>
    </Foldable>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    isOpened: true,
};
