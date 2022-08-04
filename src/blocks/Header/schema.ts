import {ImageProps, VideoProps, withTheme} from '../../schema/common';
import {BlockBaseProps, ButtonBlock, MediaProps} from '../../schema/blocks/common';
import {filteredArray} from '../../schema/utils';

const HeaderMedia = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        ...MediaProps,
        fullWidth: {type: 'boolean'},
    },
};

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
            HeaderMedia,
            {
                type: 'object',
                additionalProperties: false,
                properties: {
                    color: {type: 'string'},
                    url: {type: 'string'},
                    disableCompress: {type: 'boolean'},
                    fullWidth: {type: 'boolean'},
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
    status: {
        type: 'string',
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
