import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import Divider from './Divider';
import {Divider as DividerSchema} from './schema';

const DividerConfig: BlockData = {
    component: Divider,
    schema: {
        name: 'Divider',
        inputs: generateFromAJV(DividerSchema['divider'] as unknown as JSONSchemaType<{}>),
        default: {},
    },
};

export default DividerConfig;
