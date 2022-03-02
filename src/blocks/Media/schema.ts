import {BlockBaseProps, ButtonBlock, MediaProps} from '../../schema/v2/common';
import {AnimatableProps, LinkProps, mediaDirection} from '../../schema/common';
import {filteredArray} from '../../schema/utils';

export const Media = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: MediaProps,
};

export const MediaBlock = {
    'media-block': {
        additionalProperties: false,
        required: ['title', 'media'],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            title: {
                type: 'string',
            },
            description: {
                type: 'string',
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
            links: filteredArray(LinkProps),
            media: Media,
            button: ButtonBlock,
        },
    },
};
