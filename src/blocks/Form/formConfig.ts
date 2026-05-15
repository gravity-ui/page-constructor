import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {FormBlock as FormBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    FormBlockSchema['form-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Form Block',
    formData: {},
};
