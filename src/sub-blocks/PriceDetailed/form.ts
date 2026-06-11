import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {PriceDetailedBlock as PriceDetailedSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    PriceDetailedSchema['price-detailed'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    priceType: 'marked-list',
    items: [
        {
            title: '100$',
            description: 'Basic edition',
            detailedTitle: 'per year',
            items: [
                {
                    text: 'First item',
                },
                {
                    text: 'Second item',
                },
            ],
        },
    ],
};
