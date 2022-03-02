import {filteredArray} from '../../schema/utils';
import {BaseProps, LinkProps} from '../../schema/common';

const CardBase = {
    border: {
        type: 'string',
        enum: ['border', 'shadow'],
    },
};

const CardHeader = {
    additionalProperties: false,
    required: [],
    properties: {
        text: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
    },
};

const CardService = {
    additionalProperties: false,
    required: ['slug', 'name'],
    properties: {
        slug: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
    },
};

export const CardBlock = {
    card: {
        additionalProperties: false,
        required: [],
        properties: {
            ...BaseProps,
            ...CardBase,
            header: CardHeader,
            service: CardService,
            text: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
            footer: {
                type: 'string',
            },
            url: {
                type: 'string',
            },
            links: filteredArray(LinkProps),
        },
    },
};
