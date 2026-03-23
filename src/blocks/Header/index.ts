import {BlockData} from '../../constructor-items';

import HeaderBlock from './Header';

const HeaderBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/header-block',
    component: HeaderBlock,
    schema: {
        name: 'Header Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputsV2: [
            {
                type: 'section',
                title: 'Main settings',
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
                    },
                ],
            },
            {
                type: 'section',
                title: 'Breadcrumbs',
                fields: [
                    {
                        title: 'Item {{index}}',
                        withAddButton: true,
                        type: 'oneTypeGroup',
                        index: 'index',
                        fields: [
                            {
                                title: 'Text',
                                name: 'breadcrumbs.items[{{index}}].text',
                                type: 'textInput',
                            },
                            {
                                title: 'URL',
                                name: 'breadcrumbs.items[{{index}}].url',
                                type: 'textInput',
                            },
                        ],
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
                    },
                    {
                        title: 'Title',
                        name: 'title',
                        type: 'textInput',
                    },
                    {
                        title: 'Description',
                        name: 'description',
                        type: 'textArea',
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
                fields: [
                    {
                        title: 'Button {{index}}',
                        withAddButton: true,
                        type: 'oneTypeGroup',
                        index: 'index',
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
                                    },
                                    {
                                        title: 'URL',
                                        type: 'textInput',
                                        name: 'buttons[{{index}}].url',
                                    },
                                    {
                                        title: 'URL title',
                                        type: 'textInput',
                                        name: 'buttons[{{index}}].urlTitle',
                                    },
                                    {
                                        title: 'Style',
                                        type: 'select',
                                        name: 'buttons[{{index}}].theme',
                                        options: [{value: 'accent', content: 'Accent'}],
                                    },
                                    {
                                        title: 'Target',
                                        type: 'select',
                                        name: 'buttons[{{index}}].target',
                                        options: [{value: '_blank'}],
                                        hasClear: true,
                                    },
                                ],
                            },
                            {
                                type: 'section',
                                title: 'Analytics tracking',
                                note: {
                                    text: 'Only events for the counters listed in the input field will be sent.',
                                    level: '',
                                },
                                fields: [
                                    {
                                        title: 'Analytics event {{index2}}',
                                        type: 'oneTypeGroup',
                                        withAddButton: true,
                                        index: 'index2',
                                        fields: [
                                            {
                                                title: 'Name',
                                                type: 'textInput',
                                                name: 'buttons[{{index}}].analyticsEvents[{{index2}}].name',
                                            },
                                            {
                                                title: 'Target',
                                                type: 'textInput',
                                                name: 'buttons[{{index}}].analyticsEvents[{{index2}}].target',
                                            },
                                            {
                                                title: 'Counter {{indexgoal}}',
                                                withAddButton: true,
                                                type: 'oneTypeGroup',
                                                index: 'indexgoal',
                                                fields: [
                                                    {
                                                        title: 'Counter',
                                                        type: 'textInput',
                                                        name: 'buttons[{{index}}].analyticsEvents[{{index2}}].counters[{{indexgoal}}].includes',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
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
                                operator: '!==',
                                value: undefined,
                            },
                        ],
                    },
                    {
                        title: 'Desktop',
                        type: 'textInput',
                        name: 'background.light.image.desktop',
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
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'URL',
                        type: 'textInput',
                        name: 'background.light.video.src',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'video',
                            },
                        ],
                    },
                    {
                        type: 'text',
                        text: 'Dark theme',
                        when: [
                            {
                                field: '_mediaType',
                                operator: '!==',
                                value: undefined,
                            },
                        ],
                    },
                    {
                        title: 'Desktop',
                        type: 'textInput',
                        name: 'background.dark.image.desktop',
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
                        when: [
                            {
                                field: '_mediaType',
                                operator: '===',
                                value: 'image',
                            },
                        ],
                    },
                    {
                        title: 'URL',
                        type: 'textInput',
                        name: 'background.dark.video.src',
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
        ],
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
        previewImg: 'https://storage.cloud-preprod.yandex.net/qradle-test/header-block.svg',
    },
};

export default HeaderBlockConfig;
