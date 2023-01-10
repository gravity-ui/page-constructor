import {omit} from 'lodash';

import {
    BlockBaseProps,
    ButtonBlock,
    MediaProps,
    AnimatableProps,
    mediaDirection,
} from '../../schema/validators/common';
import {ContentBase} from '../../../src/sub-blocks/Content/schema';

export const Media = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: MediaProps,
};

const MediaBlockContentProps = omit(ContentBase, ['text', 'theme']);

export const MediaBlock = {
    'media-block': {
        additionalProperties: false,
        required: ['title', 'media'],
        properties: {
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
            media: Media,
            button: ButtonBlock,
        },
    },
};
