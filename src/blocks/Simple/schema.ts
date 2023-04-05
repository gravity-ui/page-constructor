import {
    AnimatableProps,
    BlockBaseProps,
    ChildrenProps,
    TitleProps,
} from '../../schema/validators/common';

export const SimpleBlock = {
    'simple-block': {
        additionalProperties: false,
        required: ['title', 'description'],
        properties: {
            title: TitleProps,
            description: {
                type: 'string',
                contentType: 'yfm',
            },
            ...BlockBaseProps,
            ...AnimatableProps,
            children: ChildrenProps,
        },
    },
};
