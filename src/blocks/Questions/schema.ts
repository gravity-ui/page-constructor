import {LinkProps} from '../../schema/common';
import {BlockBaseProps} from '../../schema/v2/common';
import {filteredArray} from '../../schema/utils';

export const QuestionsBlock = {
    'questions-block': {
        additionalProperties: false,
        required: ['title', 'items'],
        properties: {
            ...BlockBaseProps,
            title: {
                type: 'string',
            },
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
