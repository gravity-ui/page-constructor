import FormBlock from './Form';
import {defaultValue, form} from './formConfig';

const FormBlockConfig = {
    type: '@gravity-ui/page-constructor/form-block',
    component: FormBlock,
    schema: {
        name: 'Form Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default FormBlockConfig;
