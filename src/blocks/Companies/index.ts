import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFromAJV} from '../../utils/form-generator';

import CompaniesBlock from './Companies';
import {CompaniesBlock as CompaniesBlockSchema} from './schema';

const CompaniesBlockConfig: BlockData = {
    component: CompaniesBlock,
    schema: {
        name: 'Companies Block',
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
