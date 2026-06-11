import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {CompaniesBlock as CompaniesBlockSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    CompaniesBlockSchema['companies-block'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    title: 'Companies Block',
    description: 'Here is the list',
};
