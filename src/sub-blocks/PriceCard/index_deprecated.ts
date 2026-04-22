import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import PriceCard from './PriceCard';
import {PriceCardBlock as PriceCardSchema} from './schema';

const PriceCardConfig: BlockData = {
    type: 'price-card',
    component: PriceCard,
    schema: {
        name: 'Price Card',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            PriceCardSchema['price-card'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
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
        },
    },
};

export default PriceCardConfig;
