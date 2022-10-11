import React from 'react';
import yfm from '@doc-tools/transform';
import {Meta, Story} from '@storybook/react/types-6-0';
import {ContentLayoutBlockModel, ContentLayoutBlockProps} from '../../../models';
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
    <PageConstructor content={{blocks: [args]}} />
);

const SizesTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args.properties, size: 's'},
                    textContent: {title: getSizeTitle('S'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, size: 'l'},
                    textContent: {title: getSizeTitle('L'), ...args.textContent},
                },
            ],
        }}
    />
);

const ThemesTemplate: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {
                        ...args.properties,
                        theme: 'dark',
                        background: {
                            style: {
                                backgroundColor: '#262626',
                                ...args.properties?.background?.style,
                            },
                            ...args.properties?.background,
                        },
                    },
                    textContent: {
                        title: getThemeTitle('dark'),
                        buttons: [
                            {
                                text: data.theme.getStartedButtonTitle,
                                theme: 'normal-contrast',
                                url: 'https://example.com',
                            },
                            {
                                text: data.theme.contactButtonTitle,
                                theme: 'outlined-contrast',
                                url: 'https://example.com',
                            },
                        ],
                        ...args.textContent,
                    },
                },
                {
                    ...args,
                    properties: {
                        ...args.properties,
                        theme: 'light',
                        background: {
                            style: {
                                backgroundColor: '#CCF0D2',
                                ...args.properties?.background?.style,
                            },
                            ...args.properties?.background,
                        },
                    },
                    textContent: {
                        title: getThemeTitle('light'),
                        buttons: [
                            {
                                text: data.theme.getStartedButtonTitle,
                                theme: 'monochrome',
                                url: 'https://example.com',
                            },
                            {
                                text: data.theme.contactButtonTitle,
                                theme: 'normal',
                                url: 'https://example.com',
                            },
                        ],
                        ...args.textContent,
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
                    properties: {...args.properties, textWidth: 's'},
                    textContent: {title: getTextWidthTitle('S'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, textWidth: 'm'},
                    textContent: {title: getTextWidthTitle('M'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args.properties, textWidth: 'l'},
                    textContent: {title: getTextWidthTitle('L'), ...args.textContent},
                },
            ],
        }}
    />
);

const TextWidthTemplateWithoutTitle: Story<ContentLayoutBlockModel> = (args) => (
    <PageConstructor
        content={{
            blocks: [
                {
                    ...args,
                    properties: {...args.properties, textWidth: 's'},
                },
                {
                    ...args,
                    properties: {...args.properties, textWidth: 'm'},
                },
                {
                    ...args,
                    properties: {...args.properties, textWidth: 'l'},
                },
            ],
        }}
    />
);

export const Default = DefaultTemplate.bind([]);
export const WithFiles = DefaultTemplate.bind([]);
export const Size = SizesTemplate.bind([]);
export const WithBackgroundSizeS = DefaultTemplate.bind([]);
export const WithImageAndBackgroundSizeL = DefaultTemplate.bind([]);
export const WithImageSizeSCentered = DefaultTemplate.bind([]);
export const Theme = ThemesTemplate.bind([]);
export const TextWidth = TextWidthTemplate.bind([]);
export const TextWidthWithoutTitle = TextWidthTemplateWithoutTitle.bind([]);

Default.args = {
    ...data.default.content,
    textContent: {
        ...data.default.content.textContent,
        title: data.common.title,
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
    },
} as ContentLayoutBlockProps;

WithFiles.args = {
    ...data.withFiles.content,
    textContent: {
        ...data.withFiles.content.textContent,
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

Size.args = {
    ...data.size.content,
    textContent: {
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

WithBackgroundSizeS.args = {
    ...data.withBackgroundSizeS.content,
    textContent: {
        ...data.withBackgroundSizeS.content.textContent,
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

WithImageAndBackgroundSizeL.args = {
    ...data.withImageAndBackgroundSizeL.content,
    textContent: {
        ...data.withImageAndBackgroundSizeL.content.textContent,
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

WithImageSizeSCentered.args = {
    ...data.withImageSizeSCentered.content,
    textContent: {
        ...data.withImageSizeSCentered.content.textContent,
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
        links: data.common.links,
    },
} as ContentLayoutBlockProps;

Theme.args = {
    ...data.theme.content,
    textContent: {
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

TextWidth.args = {
    ...data.textWidth.content,
    textContent: {
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;

TextWidthWithoutTitle.args = {
    ...data.textWidthWithoutTitle.content,
    textContent: {
        text: yfm(data.common.text).result.html,
        additionalInfo: yfm(data.common.additionalInfo).result.html,
        buttons: data.common.buttons,
        links: data.common.links,
    },
    fileContent: data.common.fileContent,
} as ContentLayoutBlockProps;
