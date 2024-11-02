import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import ContentLayoutBlock from './ContentLayout';
import {ContentLayoutBlock as ContentLayoutBlockSchema} from './schema';

const ContentLayoutBlockConfig = {
    component: ContentLayoutBlock,
    schema: {
        name: 'Content Layout Block',
        group: 'block',
        inputs: generateFromAJV(
            ContentLayoutBlockSchema['content-layout-block'] as unknown as JSONSchemaType<{}>,
        ),
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
