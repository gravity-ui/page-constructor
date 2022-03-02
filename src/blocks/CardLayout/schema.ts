import {AnimatableProps, containerSizesObject, ChildrenCardsProps} from '../../schema/common';
import {BlockBaseProps, TitleProps} from '../../schema/v2/common';

export const CardLayoutProps = {
    additionalProperties: false,
    required: ['title'],
    properties: {
        ...BlockBaseProps,
        ...AnimatableProps,
        title: {
            oneOf: [{type: 'string'}, TitleProps],
        },
        description: {
            type: 'string',
        },
        colSizes: containerSizesObject,
        children: ChildrenCardsProps,
    },
};

export const CardLayoutBlock = {
    'card-layout-block': CardLayoutProps,
};
