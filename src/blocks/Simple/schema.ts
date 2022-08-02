import {BlockBaseProps, TitleProps} from '../../schema/blocks/common';
import {AnimatableProps, ChildrenProps} from '../../schema/common';

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
