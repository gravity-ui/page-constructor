import {filteredArray} from '../utils';
import {
    BaseProps,
    BackgroundProps,
    ButtonProps,
    ChildrenProps,
    dividerEnum,
    JustifyProps,
    LinkProps,
    textSize,
    ThemeProps,
    tileSizesObject,
    urlPattern,
} from '../common';

export const tileItem = {
    type: 'object',
    additionalProperties: false,
    properties: {
        text: {
            type: 'string',
        },
        icon: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
    },
};

export const headerBlock = {
    header: {
        additionalProperties: false,
        required: ['title'],
        properties: {
            ...BaseProps,
            title: {
                type: 'string',
            },
            image: {
                type: 'string',
            },
            subtitle: {
                type: 'string',
            },
            color: {
                type: 'string',
            },
            width: {
                type: 'string',
                enum: ['s', 'm', 'l'],
            },
            theme: ThemeProps,
            background: BackgroundProps,
            children: ChildrenProps,
        },
    },
};

export const textBlock = {
    text: {
        additionalProperties: false,
        required: ['text'],
        properties: {
            ...BaseProps,
            text: {
                type: 'string',
            },
            folded: {
                type: 'string',
            },
            justify: {
                type: 'string',
            },
            footnote: {
                type: 'boolean',
            },
        },
    },
};

export const titleBlock = {
    title: {
        additionalProperties: false,
        required: ['text'],
        properties: {
            ...BaseProps,
            text: {
                type: 'string',
            },
            textSize: {
                type: 'string',
                enum: textSize,
            },
            justify: {
                type: 'string',
            },
            anchor: {
                type: 'string',
            },
        },
    },
};

export const imageBlock = {
    image: {
        additionalProperties: false,
        required: ['src'],
        properties: {
            ...BaseProps,
            src: {
                type: 'string',
                pattern: urlPattern,
            },
            alt: {
                type: 'string',
            },
            width: {
                type: 'number',
            },
            height: {
                type: 'number',
            },
        },
    },
};

export const linkBlock = {
    link: LinkProps,
};

export const buttonBlock = {
    button: {
        additionalProperties: false,
        properties: {
            ...BaseProps,
            ...ButtonProps,
        },
    },
};

export const shareBlock = {
    share: {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BaseProps,
            items: {
                type: 'array',
                items: {
                    type: 'string',
                    enum: ['telegram', 'facebook', 'twitter', 'vk'],
                },
            },
            title: {
                type: 'string',
            },
        },
    },
};

export const tableBlock = {
    table: {
        additionalProperties: false,
        required: ['content'],
        properties: {
            ...BaseProps,
            content: {
                type: 'array',
                items: {
                    type: 'array',
                    items: {
                        type: ['string', 'number'],
                    },
                },
            },
            legend: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
            justify: {
                type: 'array',
                items: JustifyProps,
            },
            marker: {
                type: 'string',
                enum: ['disk'],
            },
        },
    },
};

export const dividerBlock = {
    divider: {
        additionalProperties: false,
        properties: {
            ...BaseProps,
            border: {
                type: 'boolean',
            },
            size: dividerEnum,
        },
    },
};

export const scrollableBlock = {
    scrollable: {
        additionalProperties: false,
        required: ['children'],
        properties: {
            ...BaseProps,
            children: ChildrenProps,
            itemOffset: {
                type: 'number',
            },
        },
    },
};

export const tabsBlock = {
    tabs: {
        additionalProperties: false,
        required: ['children', 'titles'],
        properties: {
            ...BaseProps,
            children: ChildrenProps,
            titles: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
        },
    },
};

export const tilesBlock = {
    tiles: {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BaseProps,
            items: filteredArray(tileItem),
            columns: tileSizesObject,
        },
    },
};

export const formBlock = {
    form: {
        additionalProperties: false,
        required: ['id'],
        properties: {
            ...BaseProps,
            id: {
                type: 'string',
            },
            border: {
                type: 'boolean',
            },
            metrikaGoals: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
        },
    },
};
