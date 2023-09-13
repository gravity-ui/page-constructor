import {AnimatableProps, BaseProps, CardBase, MediaProps} from '../../schema/validators/common';
import {AnalyticsEventSchema} from '../../schema/validators/event';

export const MediaCardBlock = {
    'media-card': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...MediaProps,
            ...AnimatableProps,
            analyticsEvents: {
                oneOf: [
                    {
                        ...AnalyticsEventSchema,
                        optionName: 'single',
                    },
                    {
                        type: 'array',
                        items: AnalyticsEventSchema,
                        optionName: 'list',
                    },
                ],
            },
        },
    },
};
