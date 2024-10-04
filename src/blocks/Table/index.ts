import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import TableBlock from './Table';
import {TableBlock as TableBlockSchema} from './schema';

const TableBlockConfig = {
    component: TableBlock,
    schema: {
        name: 'Table Block',
        inputs: generateFromAJV(TableBlockSchema['table-block'] as unknown as JSONSchemaType<{}>),
    },
};

export default TableBlockConfig;
