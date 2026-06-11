import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {ContentBlock} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    ContentBlock['content'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Content',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
