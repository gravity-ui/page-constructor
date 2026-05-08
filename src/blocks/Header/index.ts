import {BlockData} from '../../constructor-items';
import {Fields} from '../../form-generator-v2/types';

import HeaderBlock from './Header';
import icon from './icon';

const HeaderBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/header-block',
    component: HeaderBlock,
    schema: {
        name: 'Header Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: [
            {
                type: 'section',
                title: 'Layout settings',
                opened: true,
                fields: [
                    {
                        title: 'Vertical offset',
                        name: 'verticalOffset',
                        type: 'select',
                        options: [
                            {content: '0', value: '0'},
                            {content: 'S', value: 's'},
                            {content: 'M', value: 'm'},
                            {content: 'L', value: 'l'},
                            {content: 'XL', value: 'xl'},
                        ],
                        defaultValue: 'm',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Breadcrumbs',
                withAddButton: true,
                index: 'index',
                itemTitle: 'Item {{index}}',
                itemView: 'card',
                fields: [
                    {
                        title: 'Text',
                        name: 'breadcrumbs.items[{{index}}].text',
                        type: 'textInput',
                        placeholder: 'Text',
                    },
                    {
                        title: 'URL',
                        name: 'breadcrumbs.items[{{index}}].url',
                        type: 'textInput',
                        placeholder: 'https://',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Text',
                opened: true,
                fields: [
                    {
                        title: 'Overtitle',
                        name: 'overtitle',
                        type: 'textInput',
                        placeholder: 'Text',
                    },
                    {
                        title: 'Title',
                        name: 'title',
                        type: 'textInput',
                        placeholder: 'Text',
                    },
                    {
                        title: 'Description',
                        name: 'description',
                        type: 'textArea',
                        placeholder: 'Text',
                    },
                    {
                        title: 'Width',
                        name: 'width',
                        options: [
                            {content: 'S', value: 's'},
                            {content: 'M', value: 'm'},
                        ],
                        type: 'select',
                    },
                    {
                        title: 'Theme',
                        name: 'theme',
                        options: [
                            {content: 'Light', value: 'light'},
                            {content: 'Dark', value: 'dark'},
                        ],
                        type: 'segmentedRadioGroup',
                        defaultValue: 'light',
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
                title: 'Background',
                opened: true,
                fields: [
                    {
                        title: 'Color HEX',
                        type: 'textInput',
                        name: 'background.color',
                        placeholder: '#000000',
                    },
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
                        name: 'background.light.image.desktop',
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
                        name: 'background.light.image.tablet',
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
                        name: 'background.light.image.mobile',
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
                        name: 'background.dark.image.desktop',
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
                        name: 'background.dark.image.tablet',
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
                        name: 'background.dark.image.mobile',
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
                        name: 'background.video.type',
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
                        name: 'background.video.src[0]',
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
                        name: 'background.video.muted',
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
                        name: 'background.video.autoplay',
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
                        name: 'background.video.loop',
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
            type: 'header-block',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            description:
                'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            buttons: [
                {
                    text: 'Button\r',
                    theme: 'action',
                    url: 'https://example.com',
                },
                {
                    text: 'Button',
                    theme: 'outlined',
                    url: 'https://example.com',
                },
            ],
        },
        previewImg: icon,
    },
};

export default HeaderBlockConfig;
