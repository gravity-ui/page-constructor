import ContentLayoutBlock from './ContentLayout';

const ContentLayoutBlockConfig = {
    type: '@gravity-ui/page-constructor/content-layout-block',
    component: ContentLayoutBlock,
    schema: {
        name: 'Content Layout Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputsV2: [
            {
                type: 'section',
                title: 'Main settings',
                opened: true,
                fields: [
                    {
                        type: 'switch',
                        title: 'Centered',
                        name: 'centered',
                    },
                    {
                        type: 'select',
                        title: 'Top indent',
                        name: 'indent.top',
                        options: [
                            {value: '0'},
                            {value: 'xs'},
                            {value: 's'},
                            {value: 'm'},
                            {value: 'l'},
                            {value: 'xl'},
                        ],
                    },
                    {
                        type: 'select',
                        title: 'Bottom indent',
                        name: 'indent.bottom',
                        options: [
                            {value: '0'},
                            {value: 'xs'},
                            {value: 's'},
                            {value: 'm'},
                            {value: 'l'},
                            {value: 'xl'},
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
                        type: 'textInput',
                        title: 'Title',
                        name: 'textContent.title',
                    },
                    {
                        type: 'textArea',
                        title: 'Description',
                        name: 'textContent.text',
                    },
                    {
                        type: 'textArea',
                        title: 'Additional info',
                        name: 'textContent.additionalInfo',
                    },
                    {
                        type: 'select',
                        title: 'Width',
                        name: 'textWidth',
                        options: [{value: 's'}, {value: 'm'}, {value: 'l'}],
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
                            {content: 'Default', value: 'default'},
                        ],
                        name: 'theme',
                    },
                ],
            },
            {
                type: 'section',
                title: 'Content list',
                fields: [
                    {
                        type: 'oneTypeGroup',
                        withAddButton: true,
                        title: 'Item {{index1}}',
                        index: 'index1',
                        fields: [
                            {
                                type: 'textInput',
                                title: 'Title',
                                name: 'textContent.list[{{index1}}].title',
                            },
                            {
                                type: 'textArea',
                                title: 'Description',
                                name: 'textContent.list[{{index1}}].text',
                            },
                            {
                                type: 'textInput',
                                title: 'URL icon',
                                name: 'textContent.list[{{index1}}].icon',
                            },
                        ],
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
                                        name: 'textContent.buttons[{{index}}].text',
                                    },
                                    {
                                        title: 'URL',
                                        type: 'textInput',
                                        name: 'textContent.buttons[{{index}}].url',
                                    },
                                    {
                                        title: 'URL title',
                                        type: 'textInput',
                                        name: 'textContent.buttons[{{index}}].urlTitle',
                                    },
                                    {
                                        title: 'Style',
                                        type: 'select',
                                        name: 'textContent.buttons[{{index}}].theme',
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
                                        name: 'textContent.buttons[{{index}}].target',
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
                                                name: 'textContent.buttons[{{index}}].analyticsEvents[{{index2}}].name',
                                            },
                                            {
                                                title: 'Target',
                                                type: 'textInput',
                                                name: 'textContent.buttons[{{index}}].analyticsEvents[{{index2}}].target',
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
                                                        name: 'textContent.buttons[{{index}}].analyticsEvents[{{index2}}].counters[{{indexgoal}}].includes',
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
                title: 'Link',
                fields: [
                    {
                        type: 'oneTypeGroup',
                        title: 'Link {{index1}}',
                        index: 'index1',
                        withAddButton: true,
                        fields: [
                            {
                                type: 'textInput',
                                title: 'Text',
                                name: 'textContent.links[{{index1}}].text',
                            },
                            {
                                type: 'textInput',
                                title: 'URL',
                                name: 'textContent.links[{{index1}}].url',
                            },
                            {
                                type: 'textInput',
                                title: 'URL title',
                                name: 'textContent.links[{{index1}}].urlTitle',
                            },
                            {
                                type: 'select',
                                title: 'Style',
                                name: 'textContent.links[{{index1}}].theme',
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
                                name: 'textContent.links[{{index1}}].target',
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
                                                name: 'textContent.links[{{index1}}].analyticsEvents[{{index2}}].name',
                                            },
                                            {
                                                title: 'Target',
                                                type: 'textInput',
                                                name: 'textContent.links[{{index1}}].analyticsEvents[{{index2}}].target',
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
                                                        name: 'textContent.links[{{index1}}].analyticsEvents[{{index2}}].counters[{{indexgoal}}].includes',
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
                title: 'File',
                fields: [
                    {
                        type: 'oneTypeGroup',
                        withAddButton: true,
                        title: 'File {{index1}}',
                        index: 'index1',
                        fields: [
                            {
                                type: 'textInput',
                                title: 'Href',
                                name: 'fileContent[{{index1}}].href',
                            },
                            {
                                type: 'textInput',
                                title: 'Name',
                                name: 'fileContent[{{index1}}].text',
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
                        name: 'background.style.background',
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
            textContent: {
                title: 'Lorem ipsum dolor sit amet',
                text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            },
            additionalInfo:
                'Duis aute irure dolor in reprehenderit n voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            buttons: [
                {
                    text: 'Button',
                    theme: 'action',
                    url: 'https://example.com',
                },
                {
                    text: 'Button',
                    theme: 'outlined',
                    url: 'https://example.com',
                },
            ],
            links: [
                {
                    url: 'https://example.com',
                    text: 'Link',
                    theme: 'normal',
                    arrow: true,
                },
            ],
            fileContent: [
                {
                    href: 'https://example.xls',
                    text: 'File xls',
                },
                {
                    href: 'https://example.fig',
                    text: 'File PNG, JPG, and SVG format',
                },
                {
                    href: 'https://example.pdf',
                    text: 'Pdf file',
                },
                {
                    href: 'https://example.zip',
                    text: 'Archive file',
                },
                {
                    href: 'https://example.doc',
                    text: 'Microsoft Word document',
                },
                {
                    href: 'https://example.ppt',
                    text: 'PPT file',
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
        },
    },
};

export default ContentLayoutBlockConfig;
