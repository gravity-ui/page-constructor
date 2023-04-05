import {AnimatableProps, BaseProps, MediaProps} from '../../schema/validators/common';

export const MediaCardBlock = {
    'media-card': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BaseProps,
            ...MediaProps,
            ...AnimatableProps,
        },
    },
};
