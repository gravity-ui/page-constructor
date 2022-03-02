import {filteredArray} from '../../schema/utils';
import {AnimatableProps, BaseProps, mediaDirection, withTheme} from '../../schema/common';
import {Media} from '../Media/schema';

const previewRatioMediaContent = ['2-1', '1-1'];

const PreviewContentItem = {
    additionalProperties: false,
    required: ['title', 'description'],
    properties: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
    },
};

const PreviewItem = {
    type: 'object',
    additionalProperties: false,
    required: ['type', 'media', 'content'],
    properties: {
        type: {
            type: 'string',
            enum: ['video', 'image'],
        },
        media: withTheme(Media),
        content: PreviewContentItem,
    },
};

export const PreviewBlock = {
    'preview-block': {
        additionalProperties: false,
        required: ['title', 'items'],
        properties: {
            ...BaseProps,
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
            ratioMediaContent: {
                type: 'string',
                enum: previewRatioMediaContent,
            },
            items: filteredArray(PreviewItem),
        },
    },
};
