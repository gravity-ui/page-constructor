import {BlockData} from '../../constructor-items';

import CompaniesBlock from './Companies';
import {defaultValue, form} from './form';

const CompaniesBlockConfig: BlockData = {
    type: 'companies-block',
    component: CompaniesBlock,
    schema: {
        name: 'Companies Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default CompaniesBlockConfig;
