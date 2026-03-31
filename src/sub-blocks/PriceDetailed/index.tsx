import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import PriceDetailed from './PriceDetailed';
import {PriceDetailedBlock as PriceDetailedSchema} from './schema';

/** @deprecated */
const PriceDetailedConfig: BlockData = {
    type: '@gravity-ui/page-constructor/price-detailed',
    component: PriceDetailed,
    schema: {
        name: 'Price Detailed',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
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
