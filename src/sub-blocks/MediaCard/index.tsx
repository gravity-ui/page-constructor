import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import MediaCard from './MediaCard';
import {MediaCardBlock as MediaCardSchema} from './schema';

const MediaCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/media-card',
    component: MediaCard,
    schema: {
        name: 'Media Card',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            MediaCardSchema['media-card'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            content: {
                title: 'Media Card',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            },
            image: 'https://storage.yandexcloud.net/yc-www-community-images/event_ecaf1ef1-bc3a-40fa-adef-827b0959e6c3.jpg',
        },
    },
};

export default MediaCardConfig;
