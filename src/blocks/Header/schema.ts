import {ImageProps, VideoProps, withTheme} from '../../schema/common';
import {BlockBaseProps, ButtonBlock} from '../../schema/blocks/common';
import {filteredArray} from '../../schema/utils';
import {Media} from '../Media/schema';

export const HeaderProperties = {
    title: {
        type: 'string',
    },
    overtitle: {
        type: 'string',
    },
    description: {
        type: 'string',
    },
    width: {
        type: 'string',
        enum: ['s', 'm', 'l'],
    },
    buttons: filteredArray(ButtonBlock),
    offset: {
        type: 'string',
        enum: ['default', 'large'],
    },
    image: withTheme(ImageProps),
    video: withTheme(VideoProps),
    backLink: {
        type: 'object',
        required: ['url', 'title'],
        properties: {
            url: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
        },
    },
    imageSize: {
        type: 'string',
        enum: ['s', 'm'],
    },
    verticalOffset: {
        type: 'string',
        enum: ['s', 'm', 'l', 'xl'],
    },
    background: withTheme({
        oneOf: [
            Media,
            {
                type: 'object',
                additionalProperties: false,
                required: ['fullWidth'],
                properties: {
                    fullWidth: {type: 'boolean'},
                    color: {type: 'string'},
                    url: {type: 'string'},
                    disableCompress: {type: 'boolean'},
                },
            },
        ],
    }),
    theme: {
        type: 'string',
        enum: ['default', 'dark'],
    },
    breadcrumbs: {
        type: 'object',
        additionalProperties: false,
        required: ['items'],
        properties: {
            items: {
                type: 'array',
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['url', 'text'],
                    properties: {
                        url: {
                            type: 'string',
                        },
                        text: {
                            type: 'string',
                        },
                    },
                },
            },
            theme: {type: 'string', enum: ['light', 'dark']},
        },
    },
};

export const HeaderBlock = {
    'header-block': {
        additionalProperties: false,
        required: ['title'],
        properties: {
            ...BlockBaseProps,
            ...HeaderProperties,
        },
    },
};
