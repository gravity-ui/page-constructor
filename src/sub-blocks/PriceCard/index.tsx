import {BlockData} from '../../constructor-items';

import PriceCard from './PriceCard';
import {defaultValue, form} from './form';
import icon from './icon';

const PriceCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/price-card',
    component: PriceCard,
    schema: {
        name: 'Price Card',
        group: '@gravity-ui/page-constructor/Cards',
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default PriceCardConfig;
