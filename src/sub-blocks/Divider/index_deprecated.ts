import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import Divider from './Divider';
import {Divider as DividerSchema} from './schema';

const DividerConfig: BlockData = {
    type: 'divider',
    component: Divider,
    schema: {
        name: 'Divider',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            DividerSchema['divider'] as unknown as JSONSchemaType<{}>,
        ),
        default: {},
    },
};

export default DividerConfig;
