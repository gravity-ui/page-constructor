import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {HeroBlock} from './schema';

export const form = generateFormFieldsFromAjvSchema(
    HeroBlock['hero-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Lorem ipsum dolor sit amet',
    buttons: [
        {
            text: 'Button',
            theme: 'action',
            url: 'https://example.com',
        },
    ],
};
