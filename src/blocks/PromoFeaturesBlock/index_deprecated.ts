import PromoFeaturesBlock from './PromoFeaturesBlock';
import {defaultValue, form} from './form';

const PromoFeaturesBlockConfig = {
    type: 'promo-features-block',
    component: PromoFeaturesBlock,
    schema: {
        name: 'Promo Features Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default PromoFeaturesBlockConfig;
