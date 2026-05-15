import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {SliderOldBlock} from './schema';

export const form = generateFormFieldsFromAjvSchema(
    SliderOldBlock['slider-old-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Lorem ipsum dolor sit amet',
    children: [],
};
