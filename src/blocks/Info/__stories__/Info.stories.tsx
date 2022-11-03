import React from 'react';
import yfm from '@doc-tools/transform';
import {Meta, Story} from '@storybook/react/types-6-0';
import {InfoBlockModel, InfoBlockProps} from '../../../models';
import Info from '../Info';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/Info',
    component: Info,
} as Meta;

const DefaultTemplate: Story<InfoBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});

Default.args = {
    ...data.dark.content,
    leftContent: {
        ...data.dark.content.leftContent,
        title: data.common.title,
        text: yfm(data.common.text).result.html,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: yfm(data.common.text).result.html,
    },
} as InfoBlockProps;

LightTheme.args = {
    ...data.light.content,
    leftContent: {
        ...data.light.content.leftContent,
        title: data.common.title,
        text: yfm(data.common.text).result.html,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: yfm(data.common.text).result.html,
    },
} as InfoBlockProps;
