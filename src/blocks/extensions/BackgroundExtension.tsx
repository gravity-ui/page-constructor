import React from 'react';

import BackgroundMedia from '../../components/BackgroundMedia/BackgroundMedia';
import type {PageConstructorExtension} from '../../containers/PageConstructor/PageConstructor';
import type {PageConstructorWrapperProps} from '../../common/types';
import {MediaProps} from '../../models';
import {useContent} from '../../hooks';
import {block} from '../../utils';

const b = block('page-constructor');

interface BackgroundExtensionWrapperProps {}

interface BackgroundExtensionGlobalConfig {
    background?: MediaProps;
}

export interface BackgroundPageContent extends BackgroundExtensionGlobalConfig {}

export const BackgroundExtensionContentWrapper: React.FC<
    BackgroundExtensionWrapperProps & PageConstructorWrapperProps
> = ({children}) => {
    const {content} = useContent<BackgroundPageContent>();
    const {background} = content;

    return (
        <React.Fragment>
            {background && <BackgroundMedia {...background} className={b('background')} />}
            {children}
        </React.Fragment>
    );
};

export const BackgroundExtension = ({
    wrapperProps = {},
    globalDefaults = {},
}: {
    wrapperProps?: BackgroundExtensionWrapperProps;
    globalDefaults?: BackgroundExtensionGlobalConfig;
}): PageConstructorExtension<BackgroundExtensionGlobalConfig, BackgroundExtensionWrapperProps> => {
    return {
        name: 'Background Extension',
        id: '@gravity-ui/page-constructor/background-extension',
        settings: {
            ContentWrapper: BackgroundExtensionContentWrapper,
            contentWrapperProps: wrapperProps,
            globalInputs: [
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
            ],
            globalDefaults,
        },
    };
};
