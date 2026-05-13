import {Fields} from '../../form-generator-v2/types';

import MediaBlock from './Media';
import icon from './icon';

const MediaBlockConfig = {
    type: '@gravity-ui/page-constructor/media-block',
    component: MediaBlock,
    schema: {
        name: 'Media Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: [
            {
                type: 'section',
                title: 'Layout settings',
                opened: true,
                fields: [
                    {
                        type: 'select',
                        title: 'Direction',
                        name: 'direction',
                        options: [
                            {content: 'Media-content', value: 'media-content'},
                            {content: 'Content-media', value: 'content-media'},
                        ],
                    },
                    {
                        type: 'select',
                        title: 'Mobile direction',
                        name: 'mobileDirection',
                        options: [
                            {content: 'Media-content', value: 'media-content'},
                            {content: 'Content-media', value: 'content-media'},
                        ],
                    },
                    {
                        type: 'switch',
                        title: 'Large media',
                        name: 'largeMedia',
                    },
                    {
                        type: 'switch',
                        title: 'Media only',
                        name: 'mediaOnly',
                    },
                ],
            },
            {
                type: 'section',
                opened: true,
                title: 'Text',
                fields: [
                    {
                        type: 'textInput',
                        title: 'Title',
                        name: 'title',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textArea',
                        title: 'Description',
                        name: 'description',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textArea',
                        title: 'Additional info',
                        name: 'additionalInfo',
                        placeholder: 'Text',
                    },
                    {
                        type: 'select',
                        title: 'Text size',
                        name: 'size',
                        options: [{value: 's'}, {value: 'm'}, {value: 'l'}],
                    },
                    {
                        type: 'segmentedRadioGroup',
                        title: 'Theme',
                        options: [
                            {content: 'Light', value: 'light'},
                            {content: 'Dark', value: 'dark'},
                        ],
                        name: 'theme',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Content list',
                withAddButton: true,
                index: 'index1',
                itemTitle: 'Item {{index1}}',
                itemView: 'card',
                fields: [
                    {
                        type: 'textInput',
                        title: 'Title',
                        name: 'list[{{index1}}].title',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textArea',
                        title: 'Description',
                        name: 'list[{{index1}}].text',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textInput',
                        title: 'URL icon',
                        name: 'list[{{index1}}].icon',
                        placeholder: 'https://',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Buttons',
                withAddButton: true,
                index: 'index',
                itemTitle: 'Button {{index}}',
                itemView: 'card',
                fields: [
                    {
                        type: 'section',
                        title: 'Main settings',
                        opened: true,
                        fields: [
                            {
                                title: 'Text',
                                type: 'textInput',
                                name: 'buttons[{{index}}].text',
                                placeholder: 'Text',
                            },
                            {
                                title: 'URL',
                                type: 'textInput',
                                name: 'buttons[{{index}}].url',
                                placeholder: 'https://',
                            },
                            {
                                title: 'URL title',
                                type: 'textInput',
                                name: 'buttons[{{index}}].urlTitle',
                                placeholder: 'https://',
                            },
                            {
                                title: 'Style',
                                type: 'select',
                                name: 'buttons[{{index}}].theme',
                                options: [
                                    {value: 'action', content: 'Action'},
                                    {value: 'outlined', content: 'Outlined'},
                                    {value: 'normal', content: 'Normal'},
                                    {value: 'monochrome', content: 'Monochrome'},
                                    {
                                        value: 'outlined-contrast',
                                        content: 'Outlined-contrast',
                                    },
                                    {value: 'normal-contrast', content: 'Normal-contrast'},
                                ],
                            },
                            {
                                title: 'Target',
                                type: 'select',
                                name: 'buttons[{{index}}].target',
                                options: [
                                    {value: '_blank'},
                                    {value: '_self'},
                                    {value: '_parent'},
                                    {value: '_top'},
                                ],
                                hasClear: true,
                            },
                        ],
                    },
                    {
                        type: 'section',
                        title: 'Analytics tracking',
                        itemView: 'clear',
                        fields: [
                            {
                                title: 'Name',
                                type: 'textInput',
                                name: 'buttons[{{index}}].analyticsEvents[0].name',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Target',
                                type: 'textInput',
                                name: 'buttons[{{index}}].analyticsEvents[0].target',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Counter',
                                type: 'textInput',
                                name: 'buttons[{{index}}].analyticsEvents[0].counters[0].includes',
                                placeholder: 'Text',
                            },
                            {
                                type: 'text',
                                text: 'Only events for the counters listed in the input field will be sent.',
                                level: 'info',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'section',
                title: 'Link',
                index: 'index1',
                withAddButton: true,
                itemTitle: 'Link {{index1}}',
                itemView: 'card',
                fields: [
                    {
                        type: 'textInput',
                        title: 'Text',
                        name: 'links[{{index1}}].text',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textInput',
                        title: 'URL',
                        name: 'links[{{index1}}].url',
                        placeholder: 'https://',
                    },
                    {
                        type: 'textInput',
                        title: 'URL title',
                        name: 'links[{{index1}}].urlTitle',
                        placeholder: 'https://',
                    },
                    {
                        type: 'select',
                        title: 'Style',
                        name: 'links[{{index1}}].theme',
                        options: [
                            {content: 'File-link', value: 'file-link'},
                            {content: 'Normal', value: 'normal'},
                            {content: 'Back', value: 'back'},
                            {content: 'Underline', value: 'underline'},
                        ],
                    },
                    {
                        title: 'Target',
                        type: 'select',
                        name: 'links[{{index1}}].target',
                        options: [
                            {value: '_blank'},
                            {value: '_self'},
                            {value: '_parent'},
                            {value: '_top'},
                        ],
                        hasClear: true,
                    },
                    {
                        type: 'section',
                        title: 'Analytics tracking',
                        itemView: 'clear',
                        fields: [
                            {
                                title: 'Name',
                                type: 'textInput',
                                name: 'links[{{index1}}].analyticsEvents[0].name',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Target',
                                type: 'textInput',
                                name: 'links[{{index1}}].analyticsEvents[0].target',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Counter',
                                type: 'textInput',
                                name: 'links[{{index1}}].analyticsEvents[0].counters[0].includes',
                                placeholder: 'Text',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'section',
                title: 'Media',
                opened: true,
                fields: [
                    {
                        title: 'Type',
                        name: '_mediaType',
                        options: [
                            {content: 'Image', value: 'image'},
                            {content: 'Video', value: 'video'},
                        ],
                        type: 'segmentedRadioGroup',
                    },
                    {
                        title: 'Ratio',
                        type: 'select',
                        name: 'background.ratio',
                        options: [{value: 'auto'}, {value: 16 / 9, content: '16:9'}],
                        when: [
                            {
                                field: '_mediaType',
                                operator: '!==',
                                value: undefined,
                            },
                        ],
                    },
                    {
                        title: 'Border',
                        type: 'select',
                        name: 'border',
                        options: [{value: 'none'}, {value: 'shadow'}, {value: 'line'}],
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        text: 'Light theme',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Desktop',
                        type: 'textInput',
                        name: 'media.light.image.desktop',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Tablet',
                        type: 'textInput',
                        name: 'media.light.image.tablet',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Mobile',
                        type: 'textInput',
                        name: 'media.light.image.mobile',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        text: 'Dark theme',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Desktop',
                        type: 'textInput',
                        name: 'media.dark.image.desktop',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Tablet',
                        type: 'textInput',
                        name: 'media.dark.image.tablet',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Mobile',
                        type: 'textInput',
                        name: 'media.dark.image.mobile',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'Type',
                        type: 'select',
                        options: [{value: 'default'}, {value: 'player'}],
                        name: 'media.video.type',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'video',
                            },
                        ],
                    },
                    {
                        title: 'Video URL',
                        type: 'textInput',
                        name: 'media.video.src[0]',
                        placeholder: 'https://',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'video',
                            },
                        ],
                    },
                    {
                        title: 'Muted',
                        type: 'switch',
                        name: 'media.video.muted',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'video',
                            },
                        ],
                    },
                    {
                        title: 'Autoplay',
                        type: 'switch',
                        name: 'media.video.autoplay',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'video',
                            },
                        ],
                    },
                    {
                        title: 'Loop',
                        type: 'switch',
                        name: 'media.video.loop',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'video',
                            },
                        ],
                    },
                ],
            },
        ] as Fields,
        default: {
            title: 'Lorem ipsum dolor sit',
            description:
                'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            additionalInfo:
                'Duis aute irure dolor in reprehenderit n voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            links: [
                {
                    url: '#',
                    text: 'Learn more',
                    theme: 'normal',
                    arrow: true,
                },
            ],
            buttons: [
                {
                    text: 'Button',
                    theme: 'action',
                    url: 'https://example.com',
                },
                {
                    text: 'Button',
                    theme: 'outlined',
                    url: '#',
                },
            ],
            list: [
                {
                    title: 'Lorem ipsum',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    title: 'Lorem ipsum ipsum',
                },
            ],
            media: {
                light: {
                    image: {
                        desktop:
                            'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/new/media-01-01.jpg',
                    },
                },
            },
        },
        previewImg: icon,
    },
};

export default MediaBlockConfig;
