import {
    AnimatableProps,
    BlockBaseProps,
    containerSizesObject,
} from '../../schema/validators/common';
import {AnalyticsEvents} from '../../schema/validators/event';

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
        description: {
            type: 'string',
            contentType: 'text',
        },
        size: {
            type: 'string',
            enum: ['s', 'm', 'l'],
            default: 's',
        },
        colSizes: containerSizesObject,
        items: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                required: ['src'],
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
                    analyticsEvents: AnalyticsEvents,
                },
            },
        },
    },
};

export const IconsBlock = {
    'icons-block': IconsProps,
};
