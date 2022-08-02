import {BlockBaseProps, TitleProps} from '../../schema/blocks/common';
import {AnimatableProps} from '../../schema/common';
import {filteredArray} from '../../schema/utils';
import {Media} from '../Media/schema';

export const PromoFeaturesItem = {
    additionalProperties: false,
    required: ['title', 'text'],
    properties: {
        title: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        theme: {
            enum: ['accent', 'accent-light', 'primary'],
        },
        media: Media,
    },
};

export const PromoFeaturesBlock = {
    'promo-features-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            title: {
                oneOf: [{type: 'string'}, TitleProps],
            },
            description: {
                type: 'string',
            },
            theme: {
                enum: ['grey', 'default'],
            },
            items: filteredArray(PromoFeaturesItem),
        },
    },
};
