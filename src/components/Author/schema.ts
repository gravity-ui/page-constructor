import {BaseProps, authorItem} from '../../schema/common';

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
