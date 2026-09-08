import {AnimatableProps, BaseProps, CardBase, MediaProps} from '../../schema/validators/common';
import {AnalyticsEvents} from '../../schema/validators/event';

export const MediaCardBlock = {
    'media-card': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...MediaProps,
            ...AnimatableProps,
            analyticsEvents: AnalyticsEvents,
        },
    },
};
