import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import PriceCard from './PriceCard';
import {PriceCardBlock as PriceCardSchema} from './schema';

const PriceCardConfig: BlockData = {
    component: PriceCard,
    schema: {
        name: 'Price Card',
        inputs: generateFromAJV(PriceCardSchema['price-card'] as unknown as JSONSchemaType<{}>),
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
