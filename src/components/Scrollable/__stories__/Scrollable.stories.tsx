import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Scrollable, {ScrollableProps} from '../Scrollable';
import {COMPONENTS} from '../../../demo/constants';

export default {
    component: Scrollable,
    title: `${COMPONENTS}/Scrollable`,
} as Meta;

const DefaultTemplate: Story<ScrollableProps> = (args) => (
    <Scrollable {...args}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
    </Scrollable>
);

export const Default = DefaultTemplate.bind({});

Default.args = {
    itemOffset: 300,
};
