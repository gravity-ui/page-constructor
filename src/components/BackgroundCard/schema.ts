import {BaseProps, ImageObjectProps} from '../../schema/common';

export const BackgroundCard = {
    'background-card': {
        additionalProperties: false,
        required: ['url', 'title', 'text'],
        properties: {
            ...BaseProps,
            url: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
            text: {
                type: 'string',
            },
            background: ImageObjectProps,
            paddingBottom: {
                type: 'string',
                enum: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};
