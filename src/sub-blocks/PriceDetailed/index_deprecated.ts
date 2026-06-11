import {BlockData} from '../../constructor-items';

import PriceDetailed from './PriceDetailed';
import {defaultValue, form} from './form';

const PriceDetailedConfig: BlockData = {
    type: 'price-detailed',
    component: PriceDetailed,
    schema: {
        name: 'Price Detailed',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default PriceDetailedConfig;
