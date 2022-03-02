import {AnimatableProps, containerSizesObject, LinkProps} from '../../schema/common';
import {BlockBaseProps, TitleProps} from '../../schema/v2/common';
import {filteredArray} from '../../schema/utils';

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
