import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {Divider as DividerSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    DividerSchema['divider'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {};
