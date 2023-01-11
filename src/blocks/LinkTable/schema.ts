import {filteredArray} from '../../schema/validators/utils';
import {LinkProps, BlockBaseProps, BlockHeaderProps} from '../../schema/validators/common';

export const LinkTableBlock = {
    'link-table-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BlockBaseProps,
            ...BlockHeaderProps,
            items: {
                type: 'array',
                items: filteredArray(LinkProps),
            },
        },
    },
};
