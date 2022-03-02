import {tableBlock} from '../../schema/v1';
import {BlockBaseProps, ButtonBlock, TitleProps} from '../../schema/v2/common';

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

export const TextTableBlock = {
    'text-table-block': {
        additionalProperties: false,
        required: ['title', 'content'],
        properties: {
            ...BlockBaseProps,
            title: TitleProps,
            description: {
                type: 'string',
            },
            content: {
                type: 'string',
            },
            button: ButtonBlock,
        },
    },
};
