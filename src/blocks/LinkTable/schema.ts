import {BlockBaseProps, BlockHeaderProps, LinkProps} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

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
