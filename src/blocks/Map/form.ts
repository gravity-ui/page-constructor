import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {MapBlock as MapBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    MapBlockSchema['map-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Map Block',
};
