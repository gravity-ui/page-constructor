import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import Divider from './Divider';
import {Divider as DividerSchema} from './schema';

const DividerConfig: BlockData = {
    type: '@gravity-ui/page-constructor/divider',
    component: Divider,
    schema: {
        name: 'Divider',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            DividerSchema['divider'] as unknown as JSONSchemaType<{}>,
        ),
        default: {},
    },
};

export default DividerConfig;
