import omit from 'lodash/omit';

import {BlockBaseProps, LinkProps} from '../../gravity-blocks/schema/validators/common';
import {filteredArray} from '../../gravity-blocks/schema/validators/utils';
import {ContentBase} from '../../sub-blocks/Content/schema';

const QuestionsBlockContentProps = omit(ContentBase, ['size', 'theme']);

export const QuestionsBlock = {
    'questions-block': {
        additionalProperties: false,
        required: ['title', 'items'],
        properties: {
            ...BlockBaseProps,
            ...QuestionsBlockContentProps,
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
