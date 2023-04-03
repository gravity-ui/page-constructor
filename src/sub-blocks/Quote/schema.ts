import {ImageProps, urlPattern} from '../../components/Image/schema';
import {BaseProps, ThemeProps, authorItem, withTheme} from '../../schema/validators/common';

export const Quote = {
    quote: {
        additionalProperties: false,
        required: ['text', 'image', 'logo'],
        properties: {
            ...BaseProps,
            text: {
                type: 'string',
                contentType: 'text',
            },
            image: withTheme(ImageProps),
            logo: {
                type: 'string',
                pattern: urlPattern,
            },
            color: {
                type: 'string',
            },
            url: {
                type: 'string',
                pattern: urlPattern,
            },
            buttonText: {
                type: 'string',
            },
            theme: ThemeProps,
            author: authorItem,
        },
    },
};
