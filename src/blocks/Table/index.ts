import {JSONSchemaType} from 'ajv';

import {generateFromAJV} from '../../utils/form-generator';

import TableBlock from './Table';
import {TableBlock as TableBlockSchema} from './schema';

const TableBlockConfig = {
    component: TableBlock,
    schema: {
        name: 'Table Block',
        group: '@gravity-ui/page-constructor/Blocks',
        inputs: generateFromAJV(TableBlockSchema['table-block'] as unknown as JSONSchemaType<{}>),
        default: {
            type: 'table-block',
            title: 'Lorem ipsum dolor sit amet',
            table: {
                content: [
                    ['Lorem', 'ipsum 1', 'dolor 2', 'sit 3'],
                    ['Lorem 1', '0', '0', '0'],
                    ['Lorem 2', '0', '0', '1'],
                    ['Lorem 3', '0', '0', '1'],
                    ['Lorem 4', '0', '1', '1'],
                    ['Lorem 5', '1', '1', '1'],
                ],
                legend: ['ipsum 1', 'ipsum 2'],
                justify: ['start', 'center', 'center', 'center'],
            },
        },
    },
};

export default TableBlockConfig;
