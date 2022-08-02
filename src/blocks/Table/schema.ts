import {BaseProps, JustifyProps} from '../../schema/common';
import {BlockBaseProps} from '../../schema/blocks/common';

export const TableBlock = {
    'table-block': {
        additionalProperties: false,
        required: ['title', 'table'],
        properties: {
            ...BlockBaseProps,
            title: {
                type: 'string',
            },
            table: {
                additionalProperties: false,
                required: ['content'],
                properties: {
                    ...BaseProps,
                    content: {
                        type: 'array',
                        items: {
                            type: 'array',
                            items: {
                                type: ['string', 'number'],
                            },
                        },
                    },
                    legend: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                    justify: {
                        type: 'array',
                        items: JustifyProps,
                    },
                    marker: {
                        type: 'string',
                        enum: ['disk'],
                    },
                },
            },
        },
    },
};
