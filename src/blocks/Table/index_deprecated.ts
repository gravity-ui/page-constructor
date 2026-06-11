import TableBlock from './Table';
import {defaultValue, form} from './form';

const TableBlockConfig = {
    type: 'table-block',
    component: TableBlock,
    schema: {
        name: 'Table Block',
        group: '@deprecated',
        hidden: true,
        inputs: form,
        default: defaultValue,
    },
};

export default TableBlockConfig;
