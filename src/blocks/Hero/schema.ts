import pick from 'lodash/pick';

import {
    BlockBaseProps,
    ButtonProps,
    HeaderBreadcrumbsProps,
    MediaProps,
    withTheme,
} from '../../schema/validators/common';
import {filteredItem} from '../../schema/validators/utils';
import {ContentBase} from '../../sub-blocks/Content/schema';

export const HeroBlockButton = filteredItem({
    type: 'object',
    additionalProperties: false,
    required: ['text', 'url'],
    properties: pick(ButtonProps, [
        'text',
        'url',
        'theme',
        'primary',
        'size', // ignored at runtime — hero buttons always render at `xl`; kept for backward compatibility
        'target',
        'analyticsEvents',
    ]),
});

export const HeroBlockBackground = {
    type: 'object',
    additionalProperties: false,
    required: [],
    properties: {
        ...pick(MediaProps, ['image', 'video', 'parallax', 'height', 'ratio', 'previewImg']),
        color: {
            type: 'string',
        },
    },
};

export const HeroBlockProps = {
    ...pick(ContentBase, ['title', 'text', 'list', 'additionalInfo', 'links', 'theme']),
    breadcrumbs: HeaderBreadcrumbsProps,
    overtitle: {
        type: 'string',
        contentType: 'text',
    },
    buttons: {
        type: 'array',
        items: withTheme(HeroBlockButton),
    },
    media: withTheme({
        type: 'object',
        additionalProperties: false,
        required: [],
        properties: {
            ...MediaProps,
            roundCorners: {
                type: 'boolean',
            },
        },
    }),
    fullWidth: {
        type: 'boolean',
    },
    verticalOffset: {
        type: 'string',
        enum: ['s', 'm', 'l', 'xl'],
    },
    background: withTheme(HeroBlockBackground),
};

export const HeroBlock = {
    'hero-block': {
        additionalProperties: false,
        required: ['title'],
        properties: {
            ...BlockBaseProps,
            ...HeroBlockProps,
        },
    },
};
