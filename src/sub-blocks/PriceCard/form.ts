import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import {PriceCardBlock as PriceCardSchema} from './schema';

// TODO: change to custom block schema
export const form = generateFormFieldsFromAjvSchema(
    PriceCardSchema['price-card'] as unknown as JSONSchemaType<{}>,
);

export const defaultValue = {
    type: 'price-card',
    border: 'line',
    title: 'Basic',
    price: '100 $',
    pricePeriod: 'month',
    priceDetails: '+ 5% from check',
    description: 'For any purposes',
    buttons: [
        {
            url: '/',
            text: 'Read More',
            width: 'max',
            theme: 'action',
        },
    ],
};
