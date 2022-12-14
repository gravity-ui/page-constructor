import {
    AnimatableProps,
    containerSizesObject,
    ChildrenCardsProps,
    BlockBaseProps,
    BlockHeaderProps,
} from '../../schema/validators/common';

export const CardLayoutProps = {
    additionalProperties: false,
    required: ['title'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        ...BlockHeaderProps,
        colSizes: containerSizesObject,
        children: ChildrenCardsProps,
    },
};

export const CardLayoutBlock = {
    'card-layout-block': CardLayoutProps,
};
