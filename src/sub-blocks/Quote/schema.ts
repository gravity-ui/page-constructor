import {ImageProps} from '../../components/Image/schema';
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
            logo: ImageProps,
            color: {
                type: 'string',
            },
            url: {
                type: 'string',
            },
            buttonText: {
                type: 'string',
            },
            theme: ThemeProps,
            author: authorItem,
        },
    },
};
