import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import HeaderBlock from './Header';
import {HeaderBlock as HeaderBlockSchema} from './schema';

const HeaderBlockConfig = {
    component: HeaderBlock,
    schema: {
        name: 'Header Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: generateFromAJV(HeaderBlockSchema['header-block'] as unknown as JSONSchemaType<{}>),
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
