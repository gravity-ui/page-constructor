import {AnimatableProps} from '../../schema/common';
import {BlockBaseProps} from '../../schema/v2/common';

export const IconsProps = {
    additionalProperties: false,
    required: ['size', 'items'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        title: {
            type: 'string',
        },
        size: {
            type: 'string',
            enum: ['s', 'm', 'l'],
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
    'icon-block': IconsProps,
};
