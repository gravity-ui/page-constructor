import {ImageProps} from '../../components/Image/schema';
import metaInfo from '../../components/MetaInfo/schema';
import {IconPosition} from '../../models';
import {
    BaseProps,
    CardLayoutProps,
    MediaProps,
    linkTarget,
    withTheme,
} from '../../schema/validators/common';
import {AnalyticsEventSchema} from '../../schema/validators/event';
import {ContentBase} from '../../sub-blocks/Content/schema';

const LayoutItemIconImage = {
    oneOf: ImageProps.oneOf.filter(({type}) => type !== 'array'),
};

const LayoutItemIconPosition = [IconPosition.Top, IconPosition.Left];

const LayoutItemIcon = {
    type: 'object',
    additionalProperties: false,
    required: ['value'],
    properties: {
        value: LayoutItemIconImage,
        position: {
            type: 'string',
            enum: LayoutItemIconPosition,
        },
    },
};

export const LayoutItem = {
    type: 'object',
    additionalProperties: false,
    required: ['content'],
    properties: {
        ...BaseProps,
        ...CardLayoutProps,
        media: {
            type: 'object',
            additionalProperties: false,
            required: [],
            properties: MediaProps,
        },
        content: {
            type: 'object',
            additionalProperties: false,
            required: [],
            properties: ContentBase,
        },
        contentMargin: {
            type: 'string',
            enum: ['m', 'l'],
            default: 'm',
        },
        metaInfo: metaInfo,
        border: {
            type: 'boolean',
        },
        fullscreen: {
            type: 'boolean',
        },
        icon: withTheme(LayoutItemIcon),
        url: {
            type: 'string',
        },
        urlTitle: {
            type: 'string',
        },
        target: {
            type: 'string',
            enum: linkTarget,
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

export const LayoutItemBlock = {
    'layout-item': LayoutItem,
};
