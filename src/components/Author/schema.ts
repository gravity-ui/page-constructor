import {BaseProps, authorItem} from '../../gravity-blocks/schema/validators/common';

export const author = {
    author: {
        additionalProperties: false,
        required: ['author'],
        properties: {
            ...BaseProps,
            asides: {},
            author: authorItem,
        },
    },
};
