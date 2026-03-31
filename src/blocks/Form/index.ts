import {JSONSchemaType} from 'ajv';

import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import FormBlock from './Form';
import {FormBlock as FormBlockSchema} from './schema';

const FormBlockConfig = {
    type: '@gravity-ui/page-constructor/form-block',
    component: FormBlock,
    schema: {
        name: 'Form Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFormFieldsFromAjvSchema(
            FormBlockSchema['form-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Form Block',
            formData: {},
        },
    },
};

export default FormBlockConfig;
