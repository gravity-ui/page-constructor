import {BaseProps} from '../../schema/validators/common';

export const NewsCard = {
    'news-card': {
        additionalProperties: false,
        required: ['title', 'url', 'date'],
        properties: {
            ...BaseProps,
            title: {
                type: 'string',
                contentType: 'text',
            },
            url: {
                type: 'string',
            },
            date: {
                type: 'string',
            },
            isoDate: {
                type: 'string',
            },
        },
    },
};
