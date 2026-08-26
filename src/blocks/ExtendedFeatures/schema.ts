import {omit} from 'lodash';

import {ImageProps} from '../../components/Image/schema';
import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    LinkProps,
    containerSizesObject,
    withTheme,
} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';
import {ContentBase} from '../../sub-blocks/Content/schema';

export const ExtendedFeaturesItemProps = {
    ...omit(ContentBase, ['title', 'theme', 'centered', 'colSizes', 'size', 'title']),
    title: {
        type: 'string',
        contentType: 'text',
    },
    label: {
        type: 'string',
    },
    icon: withTheme(ImageProps),
    link: LinkProps,
};

export const ExtendedFeaturesItem = {
    additionalProperties: false,
    required: [],
    properties: ExtendedFeaturesItemProps,
};

export const ExtendedFeaturesBlock = {
    'extended-features-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...AnimatableProps,
            ...BlockHeaderProps,
            items: filteredArray(ExtendedFeaturesItem),
            colSizes: containerSizesObject,
        },
    },
};
