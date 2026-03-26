import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import FormBlock from './Form';
import {FormBlock as FormBlockSchema} from './schema';

const FormBlockConfig = {
    type: '@gravity-ui/page-constructor/form-block',
    component: FormBlock,
    schema: {
        name: 'Form Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFromAJV(FormBlockSchema['form-block'] as unknown as JSONSchemaType<{}>),
        default: {
            title: 'Form Block',
            formData: {},
        },
    },
};

export default FormBlockConfig;
