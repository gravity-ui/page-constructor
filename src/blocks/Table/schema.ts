import {tableBlock} from '../../schema/v1';
import {BlockBaseProps} from '../../schema/v2/common';

export const TableBlock = {
    'table-block': {
        additionalProperties: false,
        required: ['title', 'table'],
        properties: {
            ...BlockBaseProps,
            title: {
                type: 'string',
            },
            ...tableBlock,
        },
    },
};
