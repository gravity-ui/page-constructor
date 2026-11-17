import omit from 'lodash/omit';

import {ImageDeviceProps} from '../../components/Image/schema';
import {
    AnimatableProps,
    BlockBaseProps,
    ChildrenCardsProps,
    containerSizesObject,
    linkTargets,
    withTheme,
} from '../../schema/validators/common';
import {CompaniesBlock} from '../Companies/schema';

import {DEFAULT_COLUMN_GAP, DEFAULT_ROW_GAP} from './constants';

const StripImage = {
    type: 'object',
    additionalProperties: false,
    required: ['image'],
    properties: {
        image: withTheme(omit(ImageDeviceProps, ['anyOf'])),
        url: {
            type: 'string',
        },
        urlTitle: {
            type: 'string',
            contentType: 'text',
        },
        target: {
            type: 'string',
            enum: linkTargets,
        },
    },
};

export const StripBlock = {
    'strip-block': {
        additionalProperties: false,
        oneOf: [{required: ['children']}, {required: ['images']}],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            title: {
                type: 'string',
                contentType: 'text',
            },
            description: {
                type: 'string',
                contentType: 'yfm',
                inputType: 'textarea',
            },
            children: ChildrenCardsProps,
            images: {
                oneOf: [
                    CompaniesBlock['companies-block'].properties.images,
                    {
                        type: 'array',
                        minItems: 1,
                        items: StripImage,
                    },
                ],
            },
            color: {
                type: 'string',
                enum: ['text-color'],
            },
            layout: {
                type: 'string',
                enum: ['wrap', 'marquee'],
                default: 'wrap',
            },
            colSizes: containerSizesObject,
            itemHeight: {
                oneOf: [
                    {
                        type: 'number',
                        minimum: 1,
                        optionName: 'pixels',
                    },
                    {
                        type: 'string',
                        const: 'auto',
                        optionName: 'auto',
                    },
                ],
                default: 48,
            },
            rowGap: {
                type: 'number',
                minimum: 0,
                default: DEFAULT_ROW_GAP,
            },
            columnGap: {
                type: 'number',
                minimum: 0,
                default: DEFAULT_COLUMN_GAP,
            },
            pauseOnHover: {
                type: 'boolean',
                default: true,
            },
            duration: {
                type: 'number',
                minimum: 1,
                default: 60,
            },
        },
    },
};
