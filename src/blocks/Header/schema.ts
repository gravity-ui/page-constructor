import {BackgroundImageProps, ImageProps, imageUrlPattern} from '../../components/Image/schema';
import {Theme} from '../../models';
import {
    BlockBaseProps,
    ButtonBlock,
    HeaderBreadcrumbsProps,
    MediaProps,
    VideoProps,
    mediaView,
    withTheme,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

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
        image: {
            oneOf: [
                {type: 'string', pattern: imageUrlPattern, optionName: 'url'},
                ...BackgroundImageProps.oneOf,
            ],
        },
        /** @deprecated use `image` */
        url: {type: 'string', pattern: imageUrlPattern},
        /** @deprecated use `image` */
        disableCompress: {type: 'boolean'},
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
    videoIframe: HeaderVideoIframeProps,
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
        enum: [
            Theme.Light,
            Theme.Dark,
            /** @deprecated */
            'default',
        ],
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
