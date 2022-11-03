import React from 'react';
import yfm from '@doc-tools/transform';
import {Meta, Story} from '@storybook/react/types-6-0';
import {
    ContentLayoutBlockModel,
    ContentLayoutBlockProps,
    LinkProps,
    ButtonProps,
    ContentTheme,
} from '../../../models';
import Content from '../ContentLayout';
import {PageConstructor} from '../../../containers/PageConstructor/PageConstructor';

import data from './data.json';

export default {
    title: 'Blocks/ContentLayout',
    component: Content,
} as Meta;

const getSizeTitle = (size: string) => data.size.title.replace('{{size}}', size);
const getThemeTitle = (theme: string) => data.theme.title.replace('{{theme}}', theme);
const getTextWidthTitle = (textWidth: string) =>
    data.textWidth.title.replace('{{textWidth}}', textWidth);

const DefaultTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    textContent: {
                        ...args.textContent,
                        additionalInfo: yfm(data.common.additionalInfo).result.html,
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
            ],
        }}
    />
);

const WithFilesTemplate: Story<ContentLayoutBlockModel> = (args) => (
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

const SizesTemplate: Story<ContentLayoutBlockModel> = (args) => (
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

const BackgroundTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor content={{blocks: [args]}} />
);

const ThemesTemplate: Story<ContentLayoutBlockModel> = (args) => (
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

const TextWidthTemplate: Story<ContentLayoutBlockModel> = (args) => (
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
Default.args = {
    ...data.default.content,
    textContent: {
        title: data.common.title,
        text: yfm(data.common.text).result.html,
    },
} as ContentLayoutBlockProps;

WithFiles.args = {
    ...data.default.content,
    textContent: {
        text: yfm(data.common.text).result.html,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

Size.args = {
    ...data.size.content,
    textContent: {
        text: yfm(data.common.text).result.html,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

WithBackgroundColor.args = {
    ...data.withBackgroundColor.content,
    textContent: {
        title: data.common.title,
        text: yfm(data.common.text).result.html,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

WithBackgroundImageAndColor.args = {
    ...data.withImageAndBackgroundColor.content,
    textContent: {
        title: data.common.title,
        text: yfm(data.common.text).result.html,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

TextAlignCenter.args = {
    ...data.textAlignCenter.content,
    textContent: {
        title: data.common.title,
        text: yfm(data.common.text).result.html,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

Theme.args = {
    ...data.theme.content,
    textContent: {
        text: yfm(data.common.text).result.html,
    },
} as ContentLayoutBlockProps;

TextWidth.args = {
    ...data.textWidth.content,
    textContent: {
        text: yfm(data.common.text).result.html,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;
