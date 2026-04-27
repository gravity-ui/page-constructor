import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import BasicCard from './BasicCard';
import {BasicCard as BasicCardSchema} from './schema';

const BasicCardConfig: BlockData = {
    type: '@gravity-ui/page-constructor/basic-card',
    component: BasicCard,
    schema: {
        name: 'Basic Card',
        group: '@gravity-ui/page-constructor/Cards',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            BasicCardSchema['basic-card'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Basic Card',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    },
};

export default BasicCardConfig;
