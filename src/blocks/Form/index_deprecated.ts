import FormBlock from './Form';
import {defaultValue, form} from './formConfig';

const FormBlockConfig = {
    type: 'form-block',
    component: FormBlock,
    schema: {
        name: 'Form Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default FormBlockConfig;
