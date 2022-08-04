import {filteredArray} from '../../schema/validators/utils';
import {LinkProps, BlockBaseProps, TitleProps} from '../../schema/validators/common';

export const LinkTableBlock = {
    'link-table-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            title: TitleProps,
            items: {
                type: 'array',
                items: filteredArray(LinkProps),
            },
        },
    },
};
