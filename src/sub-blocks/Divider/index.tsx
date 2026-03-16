import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import Divider from './Divider';
import {Divider as DividerSchema} from './schema';

const DividerConfig: BlockData = {
    type: '@gravity-ui/page-constructor/divider',
    component: Divider,
    schema: {
        name: 'Divider',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFromAJV(DividerSchema['divider'] as unknown as JSONSchemaType<{}>),
        default: {},
    },
};

export default DividerConfig;
