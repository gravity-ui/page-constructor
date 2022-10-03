import React from 'react';
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
                        ...args,
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
                                url: 'https://console.cloud.yandex.${tld}/',
                            },
                            {
                                text: data.theme.contactButtonTitle,
                                theme: 'outlined-contrast',
                                url: '/#contact-form',
                            },
                        ],
                        ...args.textContent,
                    },
                },
                {
                    ...args,
                    properties: {
                        ...args,
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
                                url: 'https://console.cloud.yandex.${tld}/',
                            },
                            {
                                text: data.theme.contactButtonTitle,
                                theme: 'normal',
                                url: '/#contact-form',
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
                    properties: {...args, textWidth: 's'},
                    textContent: {title: getTextWidthTitle('S'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'm'},
                    textContent: {title: getTextWidthTitle('M'), ...args.textContent},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'l'},
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
                    properties: {...args, textWidth: 's'},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'm'},
                },
                {
                    ...args,
                    properties: {...args, textWidth: 'l'},
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
export const WithImageSizeLCentered = DefaultTemplate.bind([]);
export const Theme = ThemesTemplate.bind([]);
export const TextWidth = TextWidthTemplate.bind([]);
export const TextWidthWithoutTitle = TextWidthTemplateWithoutTitle.bind([]);

Default.args = data.default.content as ContentLayoutBlockProps;
WithFiles.args = data.withFiles.content as ContentLayoutBlockProps;
Size.args = data.size.content as ContentLayoutBlockProps;
WithBackgroundSizeS.args = data.withBackgroundSizeS.content as ContentLayoutBlockProps;
WithImageAndBackgroundSizeL.args = data.withImageAndBackgroundSizeL
    .content as ContentLayoutBlockProps;
WithImageSizeLCentered.args = data.withImageSizeLCentered.content as ContentLayoutBlockProps;
Theme.args = data.theme.content as ContentLayoutBlockProps;
TextWidth.args = data.textWidth.content as ContentLayoutBlockProps;
TextWidthWithoutTitle.args = data.textWidthWithoutTitle.content as ContentLayoutBlockProps;
