import {ImageProps} from '../../components/Image/schema';
import {
    BlockBaseProps,
    ButtonBlock,
    HeaderBreadcrumbsProps,
    MediaProps,
    VideoProps,
    mediaView,
    withTheme,
} from '../../gravity-blocks/schema/validators/common';
import {filteredArray} from '../../gravity-blocks/schema/validators/utils';

export const HeaderVideoIframeProps = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        src: {type: 'string'},
        autoplay: {type: 'boolean'},
        previewImg: {type: 'string'},
        height: {type: 'number'},
    },
};

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
    },
    overtitle: {
        type: 'string',
        contentType: 'text',
    },
    description: {
        type: 'string',
        contentType: 'yfm',
        inputType: 'textarea',
    },
    additionalInfo: {
        type: 'string',
        contentType: 'yfm',
        inputType: 'textarea',
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
    videoIframe: withTheme(HeaderVideoIframeProps),
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
    },
    background: withTheme(HeaderBackgroundProps),
    theme: {
        type: 'string',
        enum: ['default', 'dark'],
    },
    breadcrumbs: HeaderBreadcrumbsProps,
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
