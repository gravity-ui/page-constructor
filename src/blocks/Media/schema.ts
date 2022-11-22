import {
    BlockBaseProps,
    ButtonBlock,
    MediaProps,
    TitleProps,
    AnimatableProps,
    contentSizes,
    LinkProps,
    mediaDirection,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

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
                oneOf: [{type: 'string', contentType: 'text'}, TitleProps],
            },
            additionalInfo: {
                type: 'string',
                contentType: 'yfm',
            },
            description: {
                type: 'string',
                contentType: 'yfm',
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
