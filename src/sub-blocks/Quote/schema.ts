import {
    authorItem,
    BaseProps,
    ThemeProps,
    withTheme,
    urlPattern,
} from '../../schema/validators/common';
import {ImageProps} from '../../components/Image/schema';

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
                pattern: urlPattern,
            },
            color: {
                type: 'string',
            },
            url: {
                type: 'string',
                pattern: urlPattern,
            },
            theme: ThemeProps,
            author: authorItem,
        },
    },
};
