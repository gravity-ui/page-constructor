import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import BasicCard from './BasicCard';
import {BasicCard as BasicCardSchema} from './schema';

const BasicCardConfig: BlockData = {
    component: BasicCard,
    schema: {
        name: 'Basic Card',
        inputs: generateFromAJV(BasicCardSchema['basic-card'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Basic Card',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default BasicCardConfig;
