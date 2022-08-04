import {LinkProps, BlockBaseProps} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';

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
