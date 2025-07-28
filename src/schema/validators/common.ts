import {ImageProps} from '../../components/Image/schema';
import {
    CustomControlsButtonPositioning,
    CustomControlsType,
    MediaVideoControlsType,
    QuoteType,
    Theme,
} from '../../models';

import {AnalyticsEventSchema} from './event';

export const mediaDirection = ['media-content', 'content-media'];
export const textSize = ['xs', 's', 'sm', 'm', 'l'];
export const containerSizesArray = ['sm', 'md', 'lg', 'xl', 'all'];
export const sliderSizesArray = ['sm', 'md', 'lg', 'xl'];
export const contentSizes = ['s', 'm', 'l'];
export const contentTextWidth = ['s', 'm', 'l'];

export const videoTypes = ['default', 'player'];
export const playIconTypes = ['default', 'text'];
export const playIconThemes = ['blue', 'grey'];
export const videoControlsTypes = [MediaVideoControlsType.Default, MediaVideoControlsType.Custom];
export const fileLinkTypes = ['vertical', 'horizontal'];

export const dividerEnum = {enum: ['0', 'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']};
export const sizeNumber = {type: 'number', maximum: 12, minimum: 1};
export const contentThemes = ['default', 'dark', 'light'];
export const quoteTypes = Object.values(QuoteType);
export const mediaView = ['fit', 'full'];
export const customControlsType = [
    CustomControlsType.WithMuteButton,
    CustomControlsType.WithPlayPauseButton,
];
export const customControlsButtonPositioning = [
    CustomControlsButtonPositioning.Center,
    CustomControlsButtonPositioning.Left,
    CustomControlsButtonPositioning.Right,
];

export const BaseProps = {
    type: {},
    when: {
        type: 'string',
    },
};

export const CardLayoutProps = {
    controlPosition: {
        type: 'string',
        enum: ['content', 'footer'],
    },
};

export const containerSizesObject = {
    type: 'object',
    additionalProperties: false,
    properties: containerSizesArray.reduce((acc, size) => ({...acc, [size]: sizeNumber}), {}),
};

export const sliderSizesObject = {
    oneOf: [
        {
            type: 'object',
            additionalProperties: false,
            properties: sliderSizesArray.reduce((acc, size) => ({...acc, [size]: sizeNumber}), {}),
            optionName: 'custom',
        },
        {
            type: 'number',
            optionName: 'constant',
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

export const PlayButtonProps = {
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

export const CustomControlsOptionsProps = {
    type: 'object',
    additionalProperties: false,
    properties: {
        type: {
            type: 'string',
            enum: customControlsType,
        },
        muteButtonShown: {
            type: 'boolean',
        },
        positioning: {
            type: 'string',
            enum: customControlsButtonPositioning,
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
            oneOf: [
                {
                    ...LoopProps,
                    optionName: 'options',
                },
                {
                    type: 'boolean',
                    optionName: 'enabled',
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
        autoplay: {
            type: 'boolean',
        },
        elapsedTime: {
            type: 'number',
        },
        playButton: PlayButtonProps,
        controls: {
            type: 'string',
            enum: videoControlsTypes,
        },
        customControlsOptions: CustomControlsOptionsProps,
        ariaLabel: {
            type: 'string',
        },
        contain: {
            type: 'boolean',
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
    oneOf: [
        {
            type: 'string',
            optionName: 'id',
        },
        {
            ...DataLensObjectProps,
            optionName: 'options',
        },
    ],
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
        urlTitle: {
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
            oneOf: [
                {
                    ...AnalyticsEventSchema,
                    optionName: 'single',
                },
                {
                    type: 'array',
                    items: AnalyticsEventSchema,
                    optionName: 'list',
                },
            ],
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
        avatar: ImageProps,
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
    urlTitle: {
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
        oneOf: [
            {
                type: 'string',
                optionName: 'url',
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
                optionName: 'options',
            },
        ],
    },
    analyticsEvents: {
        oneOf: [
            {...AnalyticsEventSchema, optionName: 'single'},
            {type: 'array', items: AnalyticsEventSchema, optionName: 'list'},
        ],
    },
    target: {
        type: 'string',
        enum: ['_self', '_blank', '_parent', '_top'],
    },
    width: {
        type: 'string',
        enum: ['auto', 'max'],
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

export function withTheme<T extends object>(value: T) {
    return {
        oneOf: [
            {
                ...value,
                optionName: 'no theme',
            },
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
                optionName: 'themes',
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
        urlTitle: {
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
    indent: {
        type: 'object',
        additionalProperties: false,
        properties: {
            top: dividerEnum,
            bottom: dividerEnum,
        },
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
        urlTitle: {
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

const IframeProps = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        src: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        title: {
            type: 'string',
        },
        height: {
            type: 'number',
        },
        width: {
            type: 'number',
        },
    },
};

export const MediaProps = {
    color: {
        type: 'string',
    },
    image: {
        oneOf: [
            {...ImageProps, optionName: 'single'},
            {type: 'array', items: ImageProps, optionName: 'list'},
        ],
    },
    disableImageSliderForArrayInput: {
        type: 'boolean',
    },
    video: VideoProps,
    youtube: {
        type: 'string',
    },
    videoIframe: {
        type: 'string',
    },
    autoplay: {
        type: 'boolean',
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
    fullscreen: {
        type: 'boolean',
    },
    analyticsEvents: {
        anyOf: [AnalyticsEventSchema, {type: 'array', items: AnalyticsEventSchema}],
    },
    ratio: {
        type: ['number', 'string'],
        pattern: '^auto$',
    },
    iframe: {
        ...IframeProps,
    },
    margins: {
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

export const BorderProps = {
    type: 'string',
    enum: ['line', 'shadow', 'none'],
};

export const CardBase = {
    border: BorderProps,
};

export const BlockHeaderProps = {
    title: {
        oneOf: [
            {
                type: 'string',
                optionName: 'text',
            },
            {
                ...TitleProps,
                optionName: 'options',
            },
        ],
    },
    description: {
        type: 'string',
        contentType: 'yfm',
        inputType: 'textarea',
    },
};

export const GravityIconProps = {
    oneOf: [
        {
            type: 'string',
        },
        {
            type: 'object',
            additionalProperties: false,
            required: ['name'],
            properties: {
                name: {
                    type: 'string',
                },
                color: {
                    type: 'string',
                    enum: ['brand', 'text-color'],
                },
            },
        },
    ],
};
