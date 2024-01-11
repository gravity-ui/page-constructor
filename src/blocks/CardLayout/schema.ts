import {BackgroundImageProps} from '../../components/Image/schema';
import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    ChildrenCardsProps,
    containerSizesObject,
} from '../../schema/validators/common';

export const CardLayoutProps = {
    additionalProperties: false,
    required: [],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        ...BlockHeaderProps,
        colSizes: containerSizesObject,
        background: BackgroundImageProps,
        backgroundBorder: {
            type: 'string',
            enum: ['line', 'shadow', 'none'],
        },
        children: ChildrenCardsProps,
    },
};

export const CardLayoutBlock = {
    'card-layout-block': CardLayoutProps,
};
