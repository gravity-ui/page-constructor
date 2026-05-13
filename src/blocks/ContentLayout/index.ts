import {Fields} from '../../form-generator-v2/types';

import ContentLayoutBlock from './ContentLayout';
import icon from './icon';

const ContentLayoutBlockConfig = {
    type: '@gravity-ui/page-constructor/content-layout-block',
    component: ContentLayoutBlock,
    schema: {
        name: 'Content Layout Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: [
            {
                type: 'section',
                title: 'Layout settings',
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
                        placeholder: 'Text',
                    },
                    {
                        type: 'textArea',
                        title: 'Description',
                        name: 'textContent.text',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textArea',
                        title: 'Additional info',
                        name: 'textContent.additionalInfo',
                        placeholder: 'Text',
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
                withAddButton: true,
                index: 'index1',
                itemTitle: 'Item {{index1}}',
                itemView: 'card',
                fields: [
                    {
                        type: 'textInput',
                        title: 'Title',
                        name: 'textContent.list[{{index1}}].title',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textArea',
                        title: 'Description',
                        name: 'textContent.list[{{index1}}].text',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textInput',
                        title: 'URL icon',
                        name: 'textContent.list[{{index1}}].icon',
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
                                name: 'textContent.buttons[{{index}}].text',
                                placeholder: 'Text',
                            },
                            {
                                title: 'URL',
                                type: 'textInput',
                                name: 'textContent.buttons[{{index}}].url',
                                placeholder: 'https://',
                            },
                            {
                                title: 'URL title',
                                type: 'textInput',
                                name: 'textContent.buttons[{{index}}].urlTitle',
                                placeholder: 'https://',
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
                        itemView: 'clear',
                        fields: [
                            {
                                title: 'Name',
                                type: 'textInput',
                                name: 'textContent.buttons[{{index}}].analyticsEvents[0].name',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Target',
                                type: 'textInput',
                                name: 'textContent.buttons[{{index}}].analyticsEvents[0].target',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Counter',
                                type: 'textInput',
                                name: 'textContent.buttons[{{index}}].analyticsEvents[0].counters[0].includes',
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
                        name: 'textContent.links[{{index1}}].text',
                        placeholder: 'Text',
                    },
                    {
                        type: 'textInput',
                        title: 'URL',
                        name: 'textContent.links[{{index1}}].url',
                        placeholder: 'https://',
                    },
                    {
                        type: 'textInput',
                        title: 'URL title',
                        name: 'textContent.links[{{index1}}].urlTitle',
                        placeholder: 'https://',
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
                        itemView: 'clear',
                        fields: [
                            {
                                title: 'Name',
                                type: 'textInput',
                                name: 'textContent.links[{{index1}}].analyticsEvents[0].name',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Target',
                                type: 'textInput',
                                name: 'textContent.links[{{index1}}].analyticsEvents[0].target',
                                placeholder: 'Text',
                            },
                            {
                                title: 'Counter',
                                type: 'textInput',
                                name: 'textContent.links[{{index1}}].analyticsEvents[0].counters[0].includes',
                                placeholder: 'Text',
                            },
                        ],
                    },
                ],
            },
            {
                type: 'section',
                title: 'File',
                withAddButton: true,
                index: 'index1',
                itemTitle: 'File {{index1}}',
                itemView: 'card',
                fields: [
                    {
                        type: 'textInput',
                        title: 'Href',
                        name: 'fileContent[{{index1}}].href',
                        placeholder: 'https://',
                    },
                    {
                        type: 'textInput',
                        title: 'Name',
                        name: 'fileContent[{{index1}}].text',
                        placeholder: 'Text',
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
                        placeholder: '#000000',
                    },
                    {
                        type: 'text',
                        text: 'Light theme',
                    },
                    {
                        title: 'Desktop',
                        type: 'textInput',
                        name: 'background.light.image.desktop',
                        placeholder: 'https://',
                    },
                    {
                        title: 'Tablet',
                        type: 'textInput',
                        name: 'background.light.image.tablet',
                        placeholder: 'https://',
                    },
                    {
                        title: 'Mobile',
                        type: 'textInput',
                        name: 'background.light.image.mobile',
                        placeholder: 'https://',
                    },
                    {
                        type: 'text',
                        text: 'Dark theme',
                    },
                    {
                        title: 'Desktop',
                        type: 'textInput',
                        name: 'background.dark.image.desktop',
                        placeholder: 'https://',
                    },
                    {
                        title: 'Tablet',
                        type: 'textInput',
                        name: 'background.dark.image.tablet',
                        placeholder: 'https://',
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
                ],
            },
        ] as Fields,
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
        previewImg: icon,
    },
};

export default ContentLayoutBlockConfig;
