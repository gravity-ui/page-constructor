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

export const Light = DefaultTemplate.bind({});
export const Dark = DefaultTemplate.bind({});

Light.args = {
    ...data.light.content,
    rightContent: {
        ...data.light.content.rightContent,
        title: data.common.title,
        links: data.common.links,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        text: yfm(data.common.text).result.html,
    },
    leftContent: {
        ...data.light.content.leftContent,
        title: data.common.titleWithLink,
        links: data.common.links,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        text: yfm(data.common.text).result.html,
    },
} as InfoBlockProps;
Dark.args = {
    ...data.dark.content,
    rightContent: {
        ...data.dark.content.rightContent,
        title: data.common.title,
        links: data.common.links,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        text: yfm(data.common.text).result.html,
    },
    leftContent: {
        ...data.dark.content.leftContent,
        title: data.common.titleWithLink,
        links: data.common.links,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        text: yfm(data.common.text).result.html,
    },
} as InfoBlockProps;
