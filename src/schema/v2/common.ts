import {
    BaseProps,
    ButtonProps,
    containerSizesArray,
    DataLensProps,
    ImageProps,
    textSize,
    VideoProps,
} from '../common';

export const AnchorProps = {
    type: 'object',
    additionalProperties: false,
    required: ['text', 'url'],
    properties: {
        text: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
    },
};

export const BlockBaseProps = {
    ...BaseProps,
    anchor: AnchorProps,
    visible: {
        type: 'string',
        enum: containerSizesArray,
    },
    resetPaddings: {
        type: 'boolean',
    },
};

export const TitleProps = {
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
        },
        textSize: {
            type: 'string',
            enum: textSize,
        },
        url: {
            type: 'string',
        },
        resetMargin: {
            type: 'boolean',
        },
    },
};

export const ButtonBlock = {
    type: 'object',
    additionalProperties: false,
    properties: ButtonProps,
    if: {
        properties: {
            theme: {
                enum: ['app-store', 'google-play'],
            },
        },
    },
    then: {
        required: ['url'],
    },
    else: {
        required: ['text', 'url'],
    },
};

export const MediaProps = {
    color: {
        type: 'string',
    },
    image: {
        anyOf: [ImageProps, {type: 'array', items: ImageProps}],
    },
    video: VideoProps,
    youtube: {
        type: 'string',
    },
    parallax: {
        type: 'boolean',
    },
    height: {
        type: 'number',
    },
    previewImg: {
        type: 'string',
    },
    dataLens: DataLensProps,
};
