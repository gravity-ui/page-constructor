import {BackgroundImageProps} from '../../components/Image/schema';
import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    ChildrenCardsProps,
    containerSizesObject,
    mediaBorders,
    withTheme,
} from '../../schema/validators/common';

export const CardLayoutProps = {
    additionalProperties: false,
    required: [],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        ...BlockHeaderProps,
        colSizes: containerSizesObject,
        centered: {type: 'boolean'},
        background: withTheme({
            oneOf: BackgroundImageProps.oneOf.map((branch) => ({
                ...branch,
                properties: {
                    ...branch.properties,
                    border: {
                        type: 'string',
                        enum: mediaBorders,
                    },
                },
            })),
        }),
        children: ChildrenCardsProps,
    },
};

export const CardLayoutBlock = {
    'card-layout-block': CardLayoutProps,
};
