import {
    AnimatableProps,
    containerSizesObject,
    LinkProps,
    BlockBaseProps,
    BlockHeaderProps,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

export const ExtendedFeaturesItem = {
    additionalProperties: false,
    required: [],
    properties: {
        title: {
            type: 'string',
            contentType: 'text',
        },
        text: {
            type: 'string',
            contentType: 'yfm',
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
            ...BlockHeaderProps,
            items: filteredArray(ExtendedFeaturesItem),
            colSizes: containerSizesObject,
        },
    },
};
