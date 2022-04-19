import {Meta, Story} from '@storybook/react/types-6-0';
import React from 'react';

import Tabs, {TabsProps} from '../Tabs';
import {BUTTONS_LINKS, COMPONENTS} from '../../../demo/constants';

export default {
    component: Tabs,
    title: `${COMPONENTS}/${BUTTONS_LINKS}/Tabs`,
} as Meta;

const DefaultTemplate: Story<TabsProps> = (args) => <Tabs {...args} />;

export const Default = DefaultTemplate.bind({});

Default.args = {
    titles: ['Один', 'Два', 'Три', 'Четыре', 'Пять'],
};
