import {ImageProps, urlPattern} from '../../components/Image/schema';
import {Theme} from '../../models';

import {AnalyticsEventSchema} from './event';
import {pixelEvents} from './pixel';

export const mediaDirection = ['media-content', 'content-media'];
export const textSize = ['s', 'm', 'l'];
export const containerSizesArray = ['sm', 'md', 'lg', 'xl', 'all'];
export const sliderSizesArray = ['sm', 'md', 'lg', 'xl'];
export const contentSizes = ['s', 'l'];
export const contentTextWidth = ['s', 'm', 'l'];

export const videoTypes = ['default', 'player'];
export const playIconTypes = ['default', 'text'];
export const playIconThemes = ['blue', 'grey'];
export const videoControlsTypes = ['default', 'custom'];
export const fileLinkTypes = ['vertical', 'horizontal'];

export const dividerEnum = {enum: [0, 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']};
export const sizeNumber = {type: 'number', maximum: 12, minimum: 1};
export const contentThemes = ['default', 'dark', 'light'];

export const BaseProps = {
    type: {},
    when: {},
};

export const containerSizesObject = {
    type: 'object',
    additionalProperties: false,
    properties: containerSizesArray.reduce((acc, size) => ({...acc, [size]: sizeNumber}), {}),
};

export const sliderSizesObject = {
    anyOf: [
        {
            type: 'object',
            additionalProperties: false,
            properties: sliderSizesArray.reduce((acc, size) => ({...acc, [size]: sizeNumber}), {}),
        },
        {
            type: 'number',
        },
    ],
};

export const AnimatableProps = {
    animated: {
        type: 'boolean',
    },
};

export const ChildrenProps = {
    type: 'array',
    items: {$ref: 'self#/definitions/children'},
};

export const ChildrenCardsProps = {
    type: 'array',
    items: {$ref: 'self#/definitions/cards'},
};

export const LoopProps = {
    type: 'object',
    additionalProperties: false,
    required: ['start'],
    properties: {
        start: {
            type: 'number',
        },
        end: {
            type: 'number',
        },
    },
};

export const PlayIconProps = {
    type: 'object',
    additionalProperties: false,
    properties: {
        type: {
            type: 'string',
            enum: playIconTypes,
        },
        theme: {
            type: 'string',
            enum: playIconThemes,
        },
        text: {
            type: 'string',
            contentType: 'text',
        },
    },
};

export const VideoProps = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        src: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        loop: {
            anyOf: [
                LoopProps,
                {
                    type: 'boolean',
                },
            ],
        },
        type: {
            type: 'string',
            enum: videoTypes,
        },
        muted: {
            type: 'boolean',
        },
        playing: {
            type: 'boolean',
        },
        elapsedTime: {
            type: 'number',
        },
        playIcon: PlayIconProps,
        controls: {
            type: 'string',
            enum: videoControlsTypes,
        },
    },
};

export const ThemeProps = {
    type: 'string',
    enum: ['light', 'dark'],
};

export const JustifyProps = {
    type: 'string',
    enum: ['start', 'center', 'end'],
};

export const DataLensObjectProps = {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
        id: {
            type: 'string',
        },
        theme: ThemeProps,
    },
};

export const DataLensProps = {
    oneOf: [{type: 'string'}, DataLensObjectProps],
};

export const BackgroundProps = {
    additionalProperties: false,
    properties: {
        ...AnimatableProps,
        image: ImageProps,
        color: {
            type: 'string',
        },
        video: VideoProps,
        height: {
            type: 'number',
        },
        size: {
            type: 'string',
            enum: ['contain', 'cover'],
        },
        parallax: {
            type: 'boolean',
        },
        fullWidthMedia: {
            type: 'boolean',
        },
    },
};

export const LinkProps = {
    type: 'object',
    additionalProperties: false,
    required: ['text', 'url'],
    properties: {
        ...BaseProps,
        text: {
            type: 'string',
            contentType: 'text',
        },
        url: {
            type: 'string',
        },
        arrow: {
            type: 'boolean',
        },
        theme: {
            type: 'string',
            enum: ['back', 'file-link', 'normal'],
        },
        textSize: {
            type: 'string',
            enum: textSize,
        },
        target: {
            type: 'string',
            enum: ['_blank', '_parent', '_top', '_self'],
        },
        analyticsEvents: {
            anyOf: [AnalyticsEventSchema, {type: 'array', items: AnalyticsEventSchema}],
        },
    },
};

export const FileLinkProps = {
    type: 'object',
    additionalProperties: false,
    required: ['href', 'text'],
    properties: {
        href: {
            type: 'string',
        },
        text: {
            type: 'string',
            contentType: 'text',
        },
        type: {
            type: 'string',
            enum: fileLinkTypes,
        },
        textSize: {
            type: 'string',
            enum: textSize,
        },
        theme: {
            type: 'string',
            enum: contentThemes,
        },
    },
};

export const authorItem = {
    type: 'object',
    required: ['firstName', 'secondName'],
    properties: {
        firstName: {
            type: 'string',
            contentType: 'text',
        },
        secondName: {
            type: 'string',
            contentType: 'text',
        },
        avatar: {
            type: 'string',
            pattern: urlPattern,
        },
        description: {
            type: 'string',
            contentType: 'yfm',
        },
    },
};

export const ButtonProps = {
    text: {
        type: 'string',
        contentType: 'text',
    },
    url: {
        type: 'string',
    },
    primary: {
        type: 'boolean',
    },
    size: {
        type: 'string',
        enum: [
            'xs', // deprecated, use 's'
            'ns', // deprecated, use 's'
            's',
            'n', // deprecated, use 'l'
            'm',
            'l',
            'xl',
            'head', // deprecated, use 'l'
            'promo', // deprecated, use 'xl'
        ],
    },
    theme: {
        type: 'string',
        enum: [
            'normal',
            'action',
            'outlined',
            'outlined-info',
            'outlined-danger',
            'raised',
            'flat',
            'flat-info',
            'flat-danger',
            'flat-secondary',
            'clear',
            'normal-contrast',
            'outlined-contrast',
            'flat-contrast',
            'link', // deprecated, use 'outlined-info'
            'pseudo', // deprecated, use 'outlined'
            'pseudo-special', // deprecated, use 'outlined-contrast'
            'websearch', // deprecated, use 'action'
            'normal-dark', // deprecated, use 'outlined-contrast'
            'normal-special', // deprecated, use 'normal-contrast'
            'accent', // deprecated, use 'action'
            'dark-grey', // deprecated, use 'github'
            'app-store',
            'google-play',
            'scale',
            'github',
            'monochrome',
        ],
    },
    img: {
        anyOf: [
            {
                type: 'string',
            },
            {
                type: 'object',
                additionalProperties: false,
                required: ['data'],
                properties: {
                    data: {
                        type: 'string',
                    },
                    position: {
                        type: 'string',
                        enum: ['left', 'right'],
                    },
                    alt: {
                        type: 'string',
                        contentType: 'text',
                    },
                },
            },
        ],
    },
    /**
     * @deprecated Metrika will be deleted
     */
    metrikaGoals: {
        anyOf: [
            {type: 'string'},
            {type: 'array', items: {type: 'string'}},
            {
                type: 'array',
                items: {
                    type: 'object',
                    additionalProperties: false,
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                        },
                        isCrossSite: {
                            type: 'boolean',
                        },
                    },
                },
            },
        ],
    },
    /**
     * @deprecated Pixel will be deleted
     */
    pixelEvents,
    analyticsEvents: {
        anyOf: [AnalyticsEventSchema, {type: 'array', items: AnalyticsEventSchema}],
    },
    target: {
        type: 'string',
        enum: ['_self', '_blank', '_parent', '_top'],
    },
};

export const MenuProps = {
    type: 'object',
    additionalProperties: false,
    properties: {
        title: {
            type: 'string',
            contentType: 'text',
        },
    },
};

export function withTheme<T>(value: T) {
    return {
        oneOf: [
            value,
            {
                type: 'object',
                additionalProperties: false,
                required: [Theme.Light],
                properties: Object.values(Theme).reduce(
                    (result, themeName) => ({
                        ...result,
                        [themeName]: value,
                    }),
                    {},
                ),
            },
        ],
    };
}

export const AnchorProps = {
    type: 'object',
    additionalProperties: false,
    required: ['text', 'url'],
    properties: {
        text: {
            type: 'string',
            contentType: 'text',
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
    context: {
        type: 'string',
    },
};

export const TitleProps = {
    type: 'object',
    additionalProperties: false,
    required: ['text'],
    properties: {
        text: {
            type: 'string',
            contentType: 'text',
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
    fullScreen: {
        type: 'boolean',
    },
    fullscreen: {
        type: 'boolean',
    },
};

export const YMapMarkerLabel = {
    type: 'object',
    required: [],
    properties: {
        iconCaption: {
            type: 'string',
        },
        iconContent: {
            type: 'string',
        },
        iconColor: {
            type: 'string',
        },
        preset: {
            type: 'string',
        },
    },
};

export const YMapMarker = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        coordinate: {
            type: 'array',
            items: {type: 'number'},
        },
        address: {
            type: 'string',
        },
        label: YMapMarkerLabel,
    },
};

export const MapProps = {
    zoom: {
        type: 'number',
    },
    address: {
        type: 'string',
    },
    id: {
        type: 'string',
    },
    markers: {
        type: 'array',
        items: YMapMarker,
    },
};

export const CardBase = {
    border: {
        type: 'string',
        enum: ['line', 'shadow', 'none'],
    },
};

export const BlockHeaderProps = {
    title: {
        oneOf: [{type: 'string'}, TitleProps],
    },
    description: {
        type: 'string',
        contentType: 'yfm',
    },
};
