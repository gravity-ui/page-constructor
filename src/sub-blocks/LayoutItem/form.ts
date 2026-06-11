import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {LayoutItem as LayoutItemSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    LayoutItemSchema as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    type: 'layout-item',
    content: {
        title: 'Lorem ipsum',
        text: 'Dolor sit amet',
    },
    media: {
        image: 'https://storage.yandexcloud.net/yc-www-community-images/event_ecaf1ef1-bc3a-40fa-adef-827b0959e6c3.jpg',
    },
};
