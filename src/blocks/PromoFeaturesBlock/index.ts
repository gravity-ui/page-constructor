import {BlockData} from '../../constructor-items';

import PromoFeaturesBlock from './PromoFeaturesBlock';
import {defaultValue, form} from './form';

const PromoFeaturesBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/promo-features-block',
    component: PromoFeaturesBlock,
    schema: {
        name: 'Promo Features Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default PromoFeaturesBlockConfig;
