import React from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {yfmTransform} from '../../../../.storybook/utils';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';
import {
    ButtonProps,
    ContentLayoutBlockModel,
    ContentLayoutBlockProps,
    ContentTheme,
    LinkProps,
} from '../../../models';
import Content from '../ContentLayout';

import data from './data.json';

export default {
    title: 'Blocks/ContentLayout',
    component: Content,
} as Meta;

const getSizeTitle = (size: string) => data.size.title.replace('{{size}}', size);
const getThemeTitle = (theme: string) => data.theme.title.replace('{{theme}}', theme);
const getTextWidthTitle = (textWidth: string) =>
    data.textWidth.title.replace('{{textWidth}}', textWidth);

const DefaultTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    textContent: {
                        ...args.textContent,
                        additionalInfo: yfmTransform(data.common.additionalInfo),
                    },
                },
                {
                    ...args,
                    textContent: {...args.textContent, links: data.common.links as LinkProps[]},
                },
                {
                    ...args,
                    textContent: {
                        ...args.textContent,
                        buttons: data.common.buttons as ButtonProps[],
                    },
                },
                {
                    ...args,
                    textContent: {
                        ...args.textContent,
                        contentList: data.common.contentList.map((item) => {
                            return {
                                ...item,
                                text: item?.text && yfmTransform(item.text),
                            };
                        }),
                        links: data.common.links as LinkProps[],
                    },
                },
            ],
        }}
    />
);

const WithFilesTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args.properties, size: 'l'},
                    textContent: {title: getSizeTitle('L'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, size: 's'},
                    textContent: {title: getSizeTitle('S'), ...args.textContent},
                },
            ],
        }}
    />
);

const SizesTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args.properties, size: 'l'},
                    textContent: {title: getSizeTitle('L'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, size: 's'},
                    textContent: {title: getSizeTitle('S'), ...args.textContent},
                },
            ],
        }}
    />
);

const BackgroundTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ThemesTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {
                        ...args.properties,
                        ...data.theme.darkProperties.properties,
                        theme: data.theme.darkProperties.properties.theme as ContentTheme,
                    },
                    textContent: {
                        ...args.textContent,
                        title: getThemeTitle('dark'),
                        buttons: data.theme.darkProperties.buttons as ButtonProps[],
                    },
                },
                {
                    ...args,
                    properties: {
                        ...args.properties,
                        ...data.theme.lightProperties.properties,
                        theme: data.theme.lightProperties.properties.theme as ContentTheme,
                    },
                    textContent: {
                        ...args.textContent,
                        title: getThemeTitle('light'),
                        buttons: data.theme.lightProperties.buttons as ButtonProps[],
                    },
                },
            ],
        }}
    />
);

const TextWidthTemplate: StoryFn<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args.properties, textWidth: 'l'},
                    textContent: {title: getTextWidthTitle('L'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, textWidth: 'm'},
                    textContent: {title: getTextWidthTitle('M'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, textWidth: 's'},
                    textContent: {title: getTextWidthTitle('S'), ...args.textContent},
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind([]);
export const WithFiles = WithFilesTemplate.bind([]);
export const Size = SizesTemplate.bind([]);
export const WithBackgroundColor = BackgroundTemplate.bind({});
export const WithBackgroundImageAndColor = BackgroundTemplate.bind({});
export const TextAlignCenter = BackgroundTemplate.bind({});
export const Theme = ThemesTemplate.bind([]);
export const TextWidth = TextWidthTemplate.bind([]);

const transformedText = yfmTransform(data.common.text);

Default.args = {
    ...data.default.content,
    textContent: {
        title: data.common.title,
        text: transformedText,
    },
} as ContentLayoutBlockProps;

WithFiles.args = {
    ...data.default.content,
    textContent: {
        text: transformedText,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

Size.args = {
    ...data.size.content,
    textContent: {
        text: transformedText,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

WithBackgroundColor.args = {
    ...data.withBackgroundColor.content,
    textContent: {
        title: data.common.title,
        text: transformedText,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

WithBackgroundImageAndColor.args = {
    ...data.withImageAndBackgroundColor.content,
    textContent: {
        title: data.common.title,
        text: transformedText,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

TextAlignCenter.args = {
    ...data.textAlignCenter.content,
    textContent: {
        title: data.common.title,
        text: transformedText,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

Theme.args = {
    ...data.theme.content,
    textContent: {
        text: transformedText,
    },
} as ContentLayoutBlockProps;

TextWidth.args = {
    ...data.textWidth.content,
    textContent: {
        text: transformedText,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;
