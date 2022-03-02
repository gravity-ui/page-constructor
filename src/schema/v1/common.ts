import {
    BaseProps,
    ChildrenProps,
    containerSizesArray,
    containerSizesObject,
    JustifyProps,
} from '../common';

export const ContainerProps = {
    ...BaseProps,
    additionalProperties: false,
    sizes: containerSizesObject,
    offsets: containerSizesObject,
    justify: JustifyProps,
    hidden: {
        type: 'string',
        enum: containerSizesArray,
    },
    visible: {
        type: 'string',
        enum: containerSizesArray,
    },
    sticky: {
        type: 'boolean',
    },
    children: ChildrenProps,
};
