import {BlockBaseProps, ButtonBlock, MediaProps, TitleProps} from '../../schema/blocks/common';
import {AnimatableProps, contentSizes, LinkProps, mediaDirection} from '../../schema/common';
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
                oneOf: [{type: 'string'}, TitleProps],
            },
            additionalInfo: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            size: {
                type: 'string',
                enum: contentSizes,
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
            buttons: filteredArray(ButtonBlock),
            media: Media,
            button: ButtonBlock,
        },
    },
};
