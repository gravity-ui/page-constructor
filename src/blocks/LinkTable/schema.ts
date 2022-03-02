import {filteredArray} from '../../schema/utils';
import {LinkProps} from '../../schema/common';
import {BlockBaseProps, TitleProps} from '../../schema/v2/common';

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
