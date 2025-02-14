import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import PromoFeaturesBlock from './PromoFeaturesBlock';
import {PromoFeaturesBlock as PromoFeaturesBlockSchema} from './schema';

const PromoFeaturesBlockConfig = {
    component: PromoFeaturesBlock,
    schema: {
        name: 'Promo Features Block',
        group: 'block',
        inputs: generateFromAJV(
            PromoFeaturesBlockSchema['promo-features-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Promo Features Block',
            theme: 'default',
            items: [
                {
                    title: 'Lorem ipsum dolor sit amet',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    theme: 'accent',
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    theme: 'accent-light',
                },
                {
                    title: 'Lorem ipsum dolor sit amet',
                    text: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    theme: 'primary',
                },
            ],
        },
    },
};

export default PromoFeaturesBlockConfig;
