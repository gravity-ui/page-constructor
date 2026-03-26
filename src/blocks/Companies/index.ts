import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import CompaniesBlock from './Companies';
import {CompaniesBlock as CompaniesBlockSchema} from './schema';

const CompaniesBlockConfig: BlockData = {
    type: '@gravity-ui/page-constructor/companies-block',
    component: CompaniesBlock,
    schema: {
        name: 'Companies Block',
        group: '@gravity-ui/page-constructor/Blocks',
        // TODO: change to custom block schema
        inputs: generateFromAJV(
            CompaniesBlockSchema['companies-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Companies Block',
            description: 'Here is the list',
        },
    },
};

export default CompaniesBlockConfig;
