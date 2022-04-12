import {authorItem, BaseProps, ImageProps, ThemeProps, withTheme} from '../../schema/common';

export const Quote = {
    quote: {
        additionalProperties: false,
        required: ['text', 'image', 'logo'],
        properties: {
            ...BaseProps,
            text: {
                type: 'string',
            },
            image: withTheme(ImageProps),
            logo: {
                type: 'string',
                format: 'uri',
            },
            color: {
                type: 'string',
            },
            url: {
                type: 'string',
                format: 'uri',
            },
            theme: ThemeProps,
            author: authorItem,
        },
    },
};
