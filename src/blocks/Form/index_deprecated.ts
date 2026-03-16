import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import FormBlock from './Form';
import {FormBlock as FormBlockSchema} from './schema';

const FormBlockConfig = {
    type: 'form-block',
    component: FormBlock,
    schema: {
        name: 'Form Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFromAJV(FormBlockSchema['form-block'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Form Block',
            formData: {},
        },
    },
};

export default FormBlockConfig;
