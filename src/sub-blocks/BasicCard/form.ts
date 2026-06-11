import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {BasicCard as BasicCardSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    BasicCardSchema['basic-card'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Basic Card',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
