import {AnimatableProps, BlockBaseProps} from '../../schema/validators/common';

export const IconsProps = {
    additionalProperties: false,
    required: ['size', 'items'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        title: {
            type: 'string',
            contentType: 'text',
        },
        size: {
            type: 'string',
            enum: ['s', 'm', 'l'],
            default: 's',
        },
        items: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                required: ['url', 'text', 'src'],
                properties: {
                    url: {
                        type: 'string',
                    },
                    text: {
                        type: 'string',
                        contentType: 'text',
                    },
                    src: {
                        type: 'string',
                    },
                },
            },
        },
    },
};

export const IconsBlock = {
    'icons-block': IconsProps,
};
