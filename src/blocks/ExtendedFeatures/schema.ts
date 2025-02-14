import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    LinkProps,
    containerSizesObject,
    withTheme,
} from '../../schema/validators/common';
import {ImageProps} from '../../schema/validators/components';
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
            inputType: 'textarea',
        },
        label: {
            type: 'string',
            enum: ['New', 'Preview'],
        },
        link: LinkProps,
        icon: withTheme(ImageProps),
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
