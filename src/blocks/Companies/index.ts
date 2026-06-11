import {BlockData} from '../../constructor-items';

import CompaniesBlock from './Companies';
import {defaultValue, form} from './form';

const CompaniesBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/companies-block',
    component: CompaniesBlock,
    schema: {
        name: 'Companies Block',
        group: '@gravity-ui/page-constructor/UnfinishedBlocks',
        inputs: form,
        default: defaultValue,
    },
};

export default CompaniesBlockConfig;
