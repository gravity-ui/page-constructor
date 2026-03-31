import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import PriceDetailed from './PriceDetailed';
import {PriceDetailedBlock as PriceDetailedSchema} from './schema';

const PriceDetailedConfig: BlockData = {
    type: 'price-detailed',
    component: PriceDetailed,
    schema: {
        name: 'Price Detailed',
        group: '@deprecated',
        hidden: true,
        inputs: generateFromAJV(
            PriceDetailedSchema['price-detailed'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
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
        },
    },
};

export default PriceDetailedConfig;
