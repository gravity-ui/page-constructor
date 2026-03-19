import {ImageProps} from '../../components/Image/schema';
import {
    BlockBaseProps,
    ButtonBlock,
    MediaProps,
    VideoProps,
    mediaView,
    withTheme,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const HeaderBackgroundProps = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        ...MediaProps,
        fullWidth: {type: 'boolean'},
        fullWidthMedia: {type: 'boolean'},
    },
};

export const HeaderProperties = {
    title: {
        type: 'string',
        contentType: 'text',
        _formGenerator: {
            root: 'Text',
        },
    },
    overtitle: {
        type: 'string',
        contentType: 'text',
        _formGenerator: {
            root: 'Text',
        },
    },
    description: {
        type: 'string',
        contentType: 'yfm',
        inputType: 'textarea',
        _formGenerator: {
            root: 'Text',
        },
    },
    additionalInfo: {
        type: 'string',
        contentType: 'yfm',
        inputType: 'textarea',
        _formGenerator: {
            root: 'Text',
        },
    },
    width: {
        type: 'string',
        enum: ['s', 'm', 'l'],
        _formGenerator: {
            root: 'Text',
        },
    },
    buttons: filteredArray(ButtonBlock),
    offset: {
        type: 'string',
        enum: ['default', 'large'],
    },
    image: withTheme(ImageProps),
    video: withTheme(VideoProps),
    mediaView: {
        type: 'string',
        enum: mediaView,
    },
    backLink: {
        type: 'object',
        required: ['url', 'title'],
        properties: {
            url: {
                type: 'string',
            },
            title: {
                type: 'string',
                contentType: 'text',
            },
        },
    },
    imageSize: {
        type: 'string',
        enum: ['s', 'm'],
    },
    verticalOffset: {
        type: 'string',
        enum: ['0', 's', 'm', 'l', 'xl'],
        _formGenerator: {
            root: 'Main settings',
        },
    },
    background: withTheme(HeaderBackgroundProps),
    theme: {
        type: 'string',
        enum: ['default', 'dark'],
        _formGenerator: {
            root: 'Text',
        },
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
                            contentType: 'text',
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
    centered: {
        type: 'boolean',
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
