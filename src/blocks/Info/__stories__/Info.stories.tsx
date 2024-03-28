import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {ContentItemProps, InfoBlockModel, InfoBlockProps} from '../../../models';
import Info from '../Info';

import data from './data.json';

const transformedContentList = data.common.list.map((item) => {
    return {
        ...item,
        text: item?.text && yfmTransform(item.text),
    };
}) as ContentItemProps[];

export default {
    title: 'Blocks/Info',
    component: Info,
} as Meta;

const DefaultTemplate: StoryFn<InfoBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

export const Default = DefaultTemplate.bind({});
export const WithContentList = DefaultTemplate.bind({});
export const LightTheme = DefaultTemplate.bind({});

const transformedText = yfmTransform(data.common.text);

Default.args = {
    ...data.dark.content,
    leftContent: {
        ...data.dark.content.leftContent,
        title: data.common.title,
        text: transformedText,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: transformedText,
    },
} as InfoBlockProps;

LightTheme.args = {
    ...data.light.content,
    leftContent: {
        ...data.light.content.leftContent,
        title: data.common.title,
        text: transformedText,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: transformedText,
    },
} as InfoBlockProps;

WithContentList.args = {
    ...data.light.content,
    leftContent: {
        ...data.dark.content.leftContent,
        title: data.common.title,
        text: transformedText,
        list: transformedContentList,
    },
    rightContent: {
        title: data.common.title,
        links: data.common.links,
        text: transformedText,
        list: transformedContentList,
    },
} as InfoBlockProps;
