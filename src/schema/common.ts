import {filteredItem} from './utils';
import {pixelEvents} from './pixel';
import {Theme} from '../models';

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
export const tileSizeNumber = {type: 'number', enum: [1, 2, 3, 4]};

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

export const tileSizesObject = {
    type: 'object',
    additionalProperties: false,
    properties: containerSizesArray.reduce((acc, size) => ({...acc, [size]: tileSizeNumber}), {}),
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

export const ImageObjectProps = {
    type: 'object',
    additionalProperties: false,
    required: ['src'],
    properties: {
        src: {
            type: 'string',
            format: 'uri',
        },
        alt: {
            type: 'string',
        },
        disableCompress: {
            type: 'boolean',
        },
    },
};

export const ImageProps = {
    oneOf: [
        {
            type: 'string',
            format: 'uri',
        },
        filteredItem({
            ...ImageObjectProps,
        }),
    ],
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
        },
        secondName: {
            type: 'string',
        },
        avatar: {
            type: 'string',
            format: 'uri',
        },
        description: {
            type: 'string',
        },
    },
};

export const ButtonProps = {
    text: {
        type: 'string',
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
                    },
                },
            },
        ],
    },
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
    pixelEvents,
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
