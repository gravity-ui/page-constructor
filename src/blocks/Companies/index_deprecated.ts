import {JSONSchemaType} from 'ajv';

import {BlockData} from '../../constructor-items';
import {generateFormFieldsFromAjvSchema} from '../../form-generator-v2/utils/generateFormFieldsFromAjv';

import CompaniesBlock from './Companies';
import {CompaniesBlock as CompaniesBlockSchema} from './schema';

const CompaniesBlockConfig: BlockData = {
    type: 'companies-block',
    component: CompaniesBlock,
    schema: {
        name: 'Companies Block',
        group: '@deprecated',
        hidden: true,
        inputs: generateFormFieldsFromAjvSchema(
            CompaniesBlockSchema['companies-block'] as unknown as JSONSchemaType<{}>,
        ),
        default: {
            title: 'Companies Block',
            description: 'Here is the list',
        },
    },
};

export default CompaniesBlockConfig;
