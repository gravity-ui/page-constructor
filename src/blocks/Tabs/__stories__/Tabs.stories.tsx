import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import {TabsBlockModel} from '../../../models';
import Tabs from '../Tabs';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Tabs',
    component: Tabs,
    argTypes: {
        description: {control: 'text'},
    },
} as Meta;

const DefaultTemplate: Story<TabsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const MediaTemplate: Story<TabsBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const Media = MediaTemplate.bind({});

Default.args = data.default.content as TabsBlockModel;
Media.args = data.media.content as TabsBlockModel;
