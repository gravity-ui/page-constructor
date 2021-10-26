import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {HelloWorld, HelloWorldProps} from '../HelloWorld';

export default {
    title: 'Компоненты/HelloWorld',
    component: HelloWorld,
} as Meta;

const DefaultTemplate: Story<HelloWorldProps> = (args: any) => <HelloWorld {...args} />;
export const Default = DefaultTemplate.bind({});
