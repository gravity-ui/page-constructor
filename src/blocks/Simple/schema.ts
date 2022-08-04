import {
    BlockBaseProps,
    TitleProps,
    AnimatableProps,
    ChildrenProps,
} from '../../schema/validators/common';

export const SimpleBlock = {
    'simple-block': {
        additionalProperties: false,
        required: ['title', 'description'],
        properties: {
            title: TitleProps,
            description: {
                type: 'string',
            },
            ...BlockBaseProps,
            ...AnimatableProps,
            children: ChildrenProps,
        },
    },
};
