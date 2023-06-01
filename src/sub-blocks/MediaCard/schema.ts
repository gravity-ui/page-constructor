import {AnimatableProps, BaseProps, CardBase, MediaProps} from '../../schema/validators/common';

export const MediaCardBlock = {
    'media-card': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...MediaProps,
            ...AnimatableProps,
        },
    },
};
