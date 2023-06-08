import {omit} from 'lodash';

import {
    AnimatableProps,
    BlockBaseProps,
    ButtonBlock,
    MediaProps,
    mediaDirection,
    withTheme,
} from '../../schema/validators/common';
import {ContentBase} from '../../sub-blocks/Content/schema';

export const Media = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: MediaProps,
};

const MediaBlockContentProps = omit(ContentBase, ['text', 'theme']);

export const MediaBlockBaseProps = {
    ...BlockBaseProps,
    ...AnimatableProps,
    ...MediaBlockContentProps,
    description: {
        type: 'string',
        contentType: 'yfm',
    },
    direction: {
        type: 'string',
        enum: mediaDirection,
    },
    mobileDirection: {
        type: 'string',
        enum: mediaDirection,
    },
    largeMedia: {
        type: 'boolean',
    },
    mediaOnly: {
        type: 'boolean',
    },
    disableShadow: {
        type: 'boolean',
    },
    button: ButtonBlock,
};

export const MediaBlock = {
    'media-block': {
        additionalProperties: false,
        required: ['title', 'media'],
        properties: {
            ...MediaBlockBaseProps,
            media: withTheme(Media),
        },
    },
};
