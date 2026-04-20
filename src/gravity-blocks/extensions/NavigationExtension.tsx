import React from 'react';

import Layout from '../navigation/containers/Layout/Layout';
import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import type {PageConstructorWrapperProps} from '../../common/types';
import {NavigationData} from '../../models';
import {useContent} from '../hooks';

export interface NavigationExtensionWrapperProps {
    renderMenu?: () => React.ReactNode;
}

export interface NavigationExtensionGlobalConfig {
    navigation?: NavigationData;
}

export interface NavigationPageContent extends NavigationExtensionGlobalConfig {}

export const NavigationExtensionContentWrapper: React.FC<
    NavigationExtensionWrapperProps & PageConstructorWrapperProps
> = ({children, renderMenu}) => {
    const {content} = useContent<NavigationPageContent>();
    const {navigation} = content;

    return (
        <Layout navigation={navigation}>
            {renderMenu?.()}
            {children}
        </Layout>
    );
};

export const NavigationExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: NavigationExtensionWrapperProps;
    globalDefaults?: NavigationExtensionGlobalConfig;
}): PageConstructorExtension<NavigationExtensionGlobalConfig, NavigationExtensionWrapperProps> => {
    return {
        name: 'Navigation Extension',
        id: '@gravity-ui/page-constructor/navigation-extension',
        settings: {
            ContentWrapper: NavigationExtensionContentWrapper,
            contentWrapperProps: wrapperProps,
            globalInputs: [
                {
                    type: 'section',
                    title: 'Navigation',
                    opened: false,
                    fields: [
                        {
                            type: 'text',
                            text: 'Logo',
                        },
                        {
                            type: 'textInput',
                            title: 'Light theme desktop logo URL',
                            name: 'navigation.logo.light.icon.default',
                        },
                        {
                            type: 'textInput',
                            title: 'Light theme mobile logo URL',
                            name: 'navigation.logo.light.icon.mobile',
                        },
                        {
                            type: 'textInput',
                            title: 'Dark theme desktop logo URL',
                            name: 'navigation.logo.dark.icon.default',
                        },
                        {
                            type: 'textInput',
                            title: 'Dark theme mobile logo URL',
                            name: 'navigation.logo.dark.icon.mobile',
                        },
                        {
                            type: 'textInput',
                            title: 'Alt text',
                            name: 'navigation.logo.alt',
                        },
                        {
                            type: 'textInput',
                            title: 'Logo URL',
                            name: 'navigation.logo.url',
                        },
                        {
                            type: 'text',
                            text: 'Header',
                        },
                        {
                            type: 'switch',
                            title: 'Compact',
                            name: 'navigation.header.compact',
                        },
                        {
                            type: 'switch',
                            title: 'Hide logo',
                            name: 'navigation.header.hideLogo',
                        },
                        {
                            type: 'switch',
                            title: 'Dark theme',
                            name: 'navigation.header.isDarkTheme',
                        },
                        {
                            type: 'textInput',
                            title: 'Icon size',
                            name: 'navigation.header.iconSize',
                        },
                        {
                            type: 'switch',
                            title: 'With border',
                            name: 'navigation.header.withBorder',
                        },
                        {
                            type: 'switch',
                            title: 'With border on scroll',
                            name: 'navigation.header.withBorderOnScroll',
                        },
                        {
                            type: 'section',
                            title: 'Left menu item {{index}}',
                            index: 'index',
                            withAddButton: true,
                            fields: [
                                {
                                    type: 'textInput',
                                    title: 'Text',
                                    name: 'navigation.header.leftItems[{{index}}].text',
                                },
                                {
                                    type: 'textInput',
                                    title: 'URL',
                                    name: 'navigation.header.leftItems[{{index}}].url',
                                },
                                {
                                    type: 'select',
                                    title: 'Target',
                                    name: 'navigation.header.leftItems[{{index}}].target',
                                    options: [
                                        {value: '_blank'},
                                        {value: '_self'},
                                        {value: '_parent'},
                                        {value: '_top'},
                                    ],
                                    hasClear: true,
                                },
                                {
                                    type: 'select',
                                    title: 'Type',
                                    name: 'navigation.header.leftItems[{{index}}].type',
                                    options: [
                                        {value: 'link', content: 'Link'},
                                        {value: 'dropdown', content: 'Dropdown'},
                                        {value: 'button', content: 'Button'},
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'section',
                            title: 'Right button {{index2}}',
                            index: 'index2',
                            withAddButton: true,
                            fields: [
                                {
                                    type: 'textInput',
                                    title: 'Text',
                                    name: 'navigation.header.rightItems[{{index2}}].text',
                                },
                                {
                                    type: 'textInput',
                                    title: 'URL',
                                    name: 'navigation.header.rightItems[{{index2}}].url',
                                },
                                {
                                    type: 'select',
                                    title: 'Theme',
                                    name: 'navigation.header.rightItems[{{index2}}].theme',
                                    options: [
                                        {value: 'action', content: 'Action'},
                                        {value: 'outlined', content: 'Outlined'},
                                        {value: 'normal', content: 'Normal'},
                                        {value: 'monochrome', content: 'Monochrome'},
                                        {
                                            value: 'outlined-contrast',
                                            content: 'Outlined-contrast',
                                        },
                                        {
                                            value: 'normal-contrast',
                                            content: 'Normal-contrast',
                                        },
                                    ],
                                },
                                {
                                    type: 'select',
                                    title: 'Type',
                                    name: 'navigation.header.rightItems[{{index2}}].type',
                                    options: [
                                        {value: 'link', content: 'Link'},
                                        {value: 'button', content: 'Button'},
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'text',
                            text: 'Footer',
                        },
                        {
                            type: 'section',
                            title: 'Column {{index3}}',
                            index: 'index3',
                            withAddButton: true,
                            fields: [
                                {
                                    type: 'textInput',
                                    title: 'Title',
                                    name: 'navigation.footer.columns[{{index3}}].title',
                                },
                                {
                                    type: 'section',
                                    title: 'Link {{index4}}',
                                    index: 'index4',
                                    withAddButton: true,
                                    fields: [
                                        {
                                            type: 'textInput',
                                            title: 'Text',
                                            name: 'navigation.footer.columns[{{index3}}].links[{{index4}}].text',
                                        },
                                        {
                                            type: 'textInput',
                                            title: 'URL',
                                            name: 'navigation.footer.columns[{{index3}}].links[{{index4}}].url',
                                        },
                                        {
                                            type: 'select',
                                            title: 'Target',
                                            name: 'navigation.footer.columns[{{index3}}].links[{{index4}}].target',
                                            options: [
                                                {value: '_blank'},
                                                {value: '_self'},
                                                {value: '_parent'},
                                                {value: '_top'},
                                            ],
                                            hasClear: true,
                                        },
                                        {
                                            type: 'select',
                                            title: 'Type',
                                            name: 'navigation.footer.columns[{{index3}}].links[{{index4}}].type',
                                            options: [
                                                {value: 'link', content: 'Link'},
                                                {value: 'button', content: 'Button'},
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            type: 'section',
                            title: 'Social link {{index5}}',
                            index: 'index5',
                            withAddButton: true,
                            fields: [
                                {
                                    type: 'textInput',
                                    title: 'Icon URL',
                                    name: 'navigation.footer.social[{{index5}}].icon.src',
                                },
                                {
                                    type: 'textInput',
                                    title: 'URL',
                                    name: 'navigation.footer.social[{{index5}}].url',
                                },
                                {
                                    type: 'textInput',
                                    title: 'Alt text',
                                    name: 'navigation.footer.social[{{index5}}].urlTitle',
                                },
                            ],
                        },
                        {
                            type: 'text',
                            text: 'Underline',
                        },
                        {
                            type: 'textInput',
                            title: 'Copyright text',
                            name: 'navigation.footer.underline.copyright',
                        },
                        {
                            type: 'section',
                            title: 'Link {{index6}}',
                            index: 'index6',
                            withAddButton: true,
                            fields: [
                                {
                                    type: 'textInput',
                                    title: 'Text',
                                    name: 'navigation.footer.underline.links[{{index6}}].text',
                                },
                                {
                                    type: 'textInput',
                                    title: 'URL',
                                    name: 'navigation.footer.underline.links[{{index6}}].url',
                                },
                                {
                                    type: 'select',
                                    title: 'Type',
                                    name: 'navigation.footer.underline.links[{{index6}}].type',
                                    options: [
                                        {value: 'link', content: 'Link'},
                                        {value: 'button', content: 'Button'},
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
            globalDefaults,
        },
    };
};
