import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import ExtendedFeaturesBlock from './ExtendedFeatures';
import icon from './icon';
import {ExtendedFeaturesBlock as ExtendedFeaturesBlockSchema} from './schema';

const ExtendedFeaturesBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/extended-features-block',
    component: ExtendedFeaturesBlock,
    schema: {
        name: 'Extended Features Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            ExtendedFeaturesBlockSchema['extended-features-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            type: 'extended-features-block',
            title: {
                text: 'Lorem ipsum dolor sit amet',
                textSize: 'm',
            },
            description:
                'Three cards in a row on the desktop, two cards in a row on a tablet, one card in a row on a mobile phone.',
            items: [
                {
                    title: 'Sed do eiusmod tempor incididunt',
                    text: 'Ut enim ad minim veniam quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    additionalInfo:
                        'Duis aute irure dolor in reprehenderit n voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                },
                {
                    title: 'Sed do eiusmod tempor',
                    text: 'Ut enim ad minim veniam quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
                },
                {
                    title: 'Sed do eiusmod tempor incididunt',
                    text: 'Ut enim ad minim veniam quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    links: [
                        {
                            text: 'Go',
                            url: '#',
                            arrow: true,
                            theme: 'normal',
                        },
                    ],
                },
                {
                    title: 'Sed do eiusmod tempor incididunt',
                    text: 'Ut enim ad minim veniam quis nostrud ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                    list: [
                        {
                            title: 'Lorem ipsum',
                            text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        },
                        {
                            title: 'Lorem ipsum ipsum',
                            text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        },
                        {
                            title: 'Lorem ipsum',
                            text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        },
                    ],
                },
            ],
        },
        previewImg: icon,
    },
};

export default ExtendedFeaturesBlockConfig;
