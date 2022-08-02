import {MediaProps} from '../../schema/blocks/common';
import {BaseProps, AnimatableProps} from '../../schema/common';

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
