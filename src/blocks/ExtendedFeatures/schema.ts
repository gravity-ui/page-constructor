import {
    AnimatableProps,
    containerSizesObject,
    LinkProps,
    BlockBaseProps,
    TitleProps,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const ExtendedFeaturesItem = {
    additionalProperties: false,
    required: [],
    properties: {
        title: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
        label: {
            type: 'string',
            enum: ['New', 'Preview'],
        },
        link: LinkProps,
        icon: {
            type: 'string',
        },
    },
};

export const ExtendedFeaturesBlock = {
    'extended-features-block': {
        additionalProperties: false,
        required: [],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            title: {
                oneOf: [{type: 'string'}, TitleProps],
            },
            description: {
                type: 'string',
            },
            items: filteredArray(ExtendedFeaturesItem),
            colSizes: containerSizesObject,
        },
    },
};
