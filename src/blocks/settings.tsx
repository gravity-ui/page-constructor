import React from 'react';

import type {PageConstructorExtension} from '../containers/PageConstructor/PageConstructor';
import {MediaProps, NavigationData, PageContent, Theme} from '../models';

// Re-export GravityBlocksProvider and its props
export {
    GravityBlocksProvider,
    type GravityBlocksProviderProps,
} from '../gravity-blocks/context/GravityBlocksProvider';

// Import extensions for internal use (before re-export)
import {
    GeneralExtension,
    GeneralExtensionContentWrapper,
    BackgroundExtension,
    BackgroundExtensionContentWrapper,
    NavigationExtension,
    NavigationExtensionContentWrapper,
    BlockBaseExtension,
} from '../gravity-blocks/extensions';

// Re-export all extensions
export {
    GeneralExtension,
    GeneralExtensionContentWrapper,
    type GeneralExtensionGlobalConfig,
    type GeneralExtensionWrapperProps,
    type GeneralPageContent,
    BackgroundExtension,
    BackgroundExtensionContentWrapper,
    type BackgroundExtensionGlobalConfig,
    type BackgroundExtensionWrapperProps,
    type BackgroundPageContent,
    NavigationExtension,
    NavigationExtensionContentWrapper,
    type NavigationExtensionGlobalConfig,
    type NavigationExtensionWrapperProps,
    type NavigationPageContent,
} from '../gravity-blocks/extensions';

interface GravityBlocksWrapperProps {
    isBranded?: boolean;
    animated?: boolean;
    renderMenu?: () => React.ReactNode;
    microdata?: {
        contentUpdatedDate?: string;
    };
}

interface GravityBlocksGlobalConfig {
    background?: MediaProps;
    navigation?: NavigationData;
    isBranded?: boolean;
    animated?: boolean;
}

export interface GravityPageContent extends PageContent, GravityBlocksGlobalConfig {}

/**
 * Convenience factory that creates all three Gravity extensions at once.
 * Returns an array of extensions: [General, Background, Navigation]
 * Order matters: General wraps Background, which wraps Navigation.
 */
export const GravityBlocksExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: GravityBlocksWrapperProps;
    globalDefaults?: GravityBlocksGlobalConfig;
}): PageConstructorExtension<GravityBlocksGlobalConfig, GravityBlocksWrapperProps>[] => {
    const {background, navigation, isBranded, animated} = globalDefaults;

    return [
        GeneralExtension({
            wrapperProps: {theme: Theme.Dark},
            globalDefaults: {isBranded, animated},
        }),
        BackgroundExtension({
            globalDefaults: {background},
        }),
        NavigationExtension({
            wrapperProps,
            globalDefaults: {navigation},
        }),
        BlockBaseExtension(),
    ];
};

/**
 * @deprecated Use GravityBlocksExtension instead. Returns a single extension for backward compatibility.
 * Note: The new GravityBlocksExtension returns an array of extensions for better composability.
 */
export const GravityBlocksPlugin = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: GravityBlocksWrapperProps;
    globalDefaults?: GravityBlocksGlobalConfig;
}): PageConstructorExtension<GravityBlocksGlobalConfig, GravityBlocksWrapperProps> => {
    // Combined wrapper that nests all three extension wrappers
    const CombinedWrapper: React.FC<GravityBlocksWrapperProps & {children?: React.ReactNode}> = ({
        children,
        renderMenu,
    }) => {
        return (
            <GeneralExtensionContentWrapper>
                <BackgroundExtensionContentWrapper>
                    <NavigationExtensionContentWrapper renderMenu={renderMenu}>
                        {children}
                    </NavigationExtensionContentWrapper>
                </BackgroundExtensionContentWrapper>
            </GeneralExtensionContentWrapper>
        );
    };

    return {
        name: 'Gravity Blocks Plugin',
        id: '@gravity-ui/page-constructor/gravity-blocks-plugin',
        settings: {
            ContentWrapper: CombinedWrapper,
            contentWrapperProps: wrapperProps,
            globalInputs: [
                {
                    type: 'switch',
                    title: 'Is branded',
                    name: 'isBranded',
                },
                {
                    type: 'switch',
                    title: 'Animated',
                    name: 'animated',
                },
                {
                    type: 'switch',
                    title: 'Is branded',
                    name: 'isBranded',
                },
                {
                    type: 'switch',
                    title: 'Animated',
                    name: 'animated',
                },
                {
                    type: 'section',
                    title: 'Global settings',
                    opened: true,
                    fields: [
                        {
                            type: 'section',
                            title: 'Background',
                            opened: false,
                            fields: [
                                {
                                    type: 'textInput',
                                    title: 'Media type',
                                    name: '_mediaType',
                                },
                            ],
                        },
                    ],
                },
                {
                    type: 'section',
                    title: 'Background',
                    opened: false,
                    fields: [
                        {
                            type: 'segmentedRadioGroup',
                            title: 'Media type',
                            name: 'background._mediaType',
                            options: [
                                {content: 'Image', value: 'image'},
                                {content: 'Video', value: 'video'},
                                {content: 'YouTube', value: 'youtube'},
                                {content: 'Iframe', value: 'iframe'},
                            ],
                        },
                        {
                            type: 'text',
                            text: 'Light theme',
                            when: [
                                {field: 'background._mediaType', operator: '!==', value: undefined},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Desktop image URL',
                            name: 'background.image.light.desktop',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'image'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Tablet image URL',
                            name: 'background.image.light.tablet',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'image'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Mobile image URL',
                            name: 'background.image.light.mobile',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'image'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Video URL',
                            name: 'background.video.src',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'video'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'YouTube URL',
                            name: 'background.youtube',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'youtube'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Iframe URL',
                            name: 'background.iframe.src',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'iframe'},
                            ],
                        },
                        {
                            type: 'text',
                            text: 'Dark theme',
                            when: [
                                {field: 'background._mediaType', operator: '!==', value: undefined},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Desktop image URL',
                            name: 'background.image.dark.desktop',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'image'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Tablet image URL',
                            name: 'background.image.dark.tablet',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'image'},
                            ],
                        },
                        {
                            type: 'textInput',
                            title: 'Mobile image URL',
                            name: 'background.image.dark.mobile',
                            when: [
                                {field: 'background._mediaType', operator: '===', value: 'image'},
                            ],
                        },
                        {
                            type: 'colorInput',
                            title: 'Color overlay',
                            name: 'background.color',
                        },
                        {
                            type: 'switch',
                            title: 'Parallax effect',
                            name: 'background.parallax',
                        },
                    ],
                },
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
                            type: 'numberInput',
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
            ] as unknown as import('../form-generator').ConfigInput[],
            globalDefaults,
        },
    };
};
