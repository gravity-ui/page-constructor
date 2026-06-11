import {BlockData} from '../../constructor-items';

import PriceCard from './PriceCard';
import {defaultValue, form} from './form';
import icon from './icon';

const PriceCardConfig: BlockData = {
    type: 'price-card',
    component: PriceCard,
    schema: {
        name: 'Price Card',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
        previewImg: icon,
    },
};

export default PriceCardConfig;
