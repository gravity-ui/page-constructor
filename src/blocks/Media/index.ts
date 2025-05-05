import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import MediaBlock from './Media';
import {MediaBlock as MediaBlockSchema} from './schema';

const MediaBlockConfig = {
    component: MediaBlock,
    schema: {
        name: 'Media Block',
        group: 'block',
        inputs: generateFromAJV(MediaBlockSchema['media-block'] as unknown as JSONSchemaType<{}>),
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
                image: 'https://storage.yandexcloud.net/cloud-www-assets/constructor/main/new/media-01-01.jpg',
            },
        },
        previewImg: 'https://storage.cloud-preprod.yandex.net/qradle-test/media-block.svg',
    },
};

export default MediaBlockConfig;
