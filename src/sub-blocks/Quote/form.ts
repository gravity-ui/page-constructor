import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {Quote as QuoteSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    QuoteSchema['quote'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    text: 'A good decision is based on knowledge and not on numbers.',
    author: {
        firstName: ' Plato',
        description: 'Greek philosopher',
    },
};
