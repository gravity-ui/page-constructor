import {
    VideoProps,
    withTheme,
    BlockBaseProps,
    ButtonBlock,
    MediaProps,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';
import {ImageProps} from '../../components/Image/schema';

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
        ...MediaProps,
        fullWidth: {type: 'boolean'},
        fullWidthMedia: {type: 'boolean'},
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
