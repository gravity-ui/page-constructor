import _ from 'lodash';

import {LinkProps} from '../../schema/common';
import {BlockBaseProps} from '../../schema/v2/common';
import {filteredArray} from '../../schema/utils';
import {ContentBase} from '../../components/Content/schema';

const QuestionsBlockContentProps = _.omit(ContentBase, ['size', 'theme']);

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
                    },
                    text: {
                        type: 'string',
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
