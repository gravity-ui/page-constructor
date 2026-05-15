import {BlockData} from '../../constructor-items';

import PriceDetailed from './PriceDetailed';
import {defaultValue, form} from './form';
import icon from './icon';

/** @deprecated */
const PriceDetailedConfig: BlockData = {
    type: '@gravity-ui/page-constructor/price-detailed',
    component: PriceDetailed,
    schema: {
        name: 'Price Detailed',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default PriceDetailedConfig;
