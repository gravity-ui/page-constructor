import React from 'react';
import yfm from '@doc-tools/transform';
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

export const Default = DefaultTemplate.bind({});
export const WithTheme = DefaultTemplate.bind({});
export const Media = DefaultTemplate.bind({});

Default.args = {
    ...data.default.content,
    items: data.default.content.items.map((item) => ({
        ...item,
        title: yfm(item.title).result.html,
        text: yfm(item.text).result.html,
    })),
} as TabsBlockModel;
WithTheme.args = data.theme.content as TabsBlockModel;
Media.args = data.media.content as TabsBlockModel;
