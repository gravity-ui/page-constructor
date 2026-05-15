import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {ShareBlock as ShareBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    ShareBlockSchema['share-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    items: ['vk', 'telegram', 'facebook'],
    title: 'Share Block',
};
