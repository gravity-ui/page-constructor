import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import PromoFeaturesBlock from './PromoFeaturesBlock';
import {PromoFeaturesBlock as PromoFeaturesBlockSchema} from './schema';

const PromoFeaturesBlockConfig = {
    component: PromoFeaturesBlock,
    schema: {
        name: 'Promo Features Block',
        inputs: generateFromAJV(
            PromoFeaturesBlockSchema['promo-features-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Promo Features Block',
            items: [{}],
        },
    },
};

export default PromoFeaturesBlockConfig;
