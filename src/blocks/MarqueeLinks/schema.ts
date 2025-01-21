import {BaseProps} from '../../schema/validators/common';

export const MarqueeLink = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        src: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
    },
};

export const MarqueeLinks = {
    'marquee-links-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BaseProps,
            title: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            textAlign: {
                type: 'string',
                enum: ['left', 'right', 'center'],
            },
            speed: {
                type: 'number',
            },
            items: {
                type: 'array',
                items: MarqueeLink,
            },
        },
    },
};
