import {ImageBaseObjectProps, ImageDeviceProps} from '../../components/Image/schema';
import {
    AnimatableProps,
    BlockBaseProps,
    BlockHeaderProps,
    BorderProps,
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
        background: {
            anyOf: [
                {
                    ...ImageBaseObjectProps,
                    properties: {...ImageBaseObjectProps.properties, border: BorderProps},
                    optionName: 'options',
                },
                {
                    ...ImageDeviceProps,
                    properties: {...ImageDeviceProps.properties, border: BorderProps},
                    optionName: 'device options',
                },
            ],
        },
        children: ChildrenCardsProps,
    },
};

export const CardLayoutBlock = {
    'card-layout-block': CardLayoutProps,
};
