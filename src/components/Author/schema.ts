import {BaseProps, authorItem} from '../../schema/validators/common';

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
