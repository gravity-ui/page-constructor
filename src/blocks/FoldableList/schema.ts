import omit from 'lodash/omit';

import {BlockBaseProps, LinkProps} from '../../gravity-blocks/schema/validators/common';
import {filteredArray} from '../../gravity-blocks/schema/validators/utils';
import {ContentBase} from '../../sub-blocks/Content/schema';

const FoldableListBlockContentProps = omit(ContentBase, ['size', 'theme']);

export const FoldableListBlock = {
    'foldable-list-block': {
        additionalProperties: false,
        required: ['title', 'items'],
        properties: {
            ...BlockBaseProps,
            ...FoldableListBlockContentProps,
            items: filteredArray({
                type: 'object',
                required: ['title', 'text'],
                properties: {
                    title: {
                        type: 'string',
                        contentType: 'text',
                    },
                    text: {
                        type: 'string',
                        contentType: 'yfm',
                    },
                    link: LinkProps,
                    listStyle: {
                        type: 'string',
                        enum: ['dash', 'disk'],
                    },
                },
            }),
        },
    },
};
