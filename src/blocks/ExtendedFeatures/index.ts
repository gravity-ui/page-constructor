import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import ExtendedFeaturesBlock from './ExtendedFeatures';
import {ExtendedFeaturesBlock as ExtendedFeaturesBlockSchema} from './schema';

const ExtendedFeaturesBlockConfig = {
    component: ExtendedFeaturesBlock,
    schema: {
        name: 'Extended Features Block',
        inputs: generateFromAJV(
            ExtendedFeaturesBlockSchema['extended-features-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Extended Features Block',
            items: [{}],
        },
    },
};

export default ExtendedFeaturesBlockConfig;
