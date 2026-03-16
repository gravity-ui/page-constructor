import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import PriceCard from './PriceCard';
import {PriceCardBlock as PriceCardSchema} from './schema';

const PriceCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/price-card',
    component: PriceCard,
    schema: {
        name: 'Price Card',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
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
