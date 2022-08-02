import {filteredArray} from '../../schema/utils';
import {LinkProps} from '../../schema/common';
import {BlockBaseProps, TitleProps} from '../../schema/blocks/common';

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
