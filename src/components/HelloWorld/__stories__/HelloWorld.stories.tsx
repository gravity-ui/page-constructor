import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {HelloWorld, HelloWorldProps} from '../HelloWorld';

export default {
    title: 'Компоненты/HelloWorld',
    component: HelloWorld,
} as Meta;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultTemplate: Story<HelloWorldProps> = (args: any) => <HelloWorld {...args} />;
export const Default = DefaultTemplate.bind({});
