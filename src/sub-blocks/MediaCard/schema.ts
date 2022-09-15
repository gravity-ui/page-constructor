import {MediaProps, BaseProps, AnimatableProps} from '../../schema/validators/common';

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
