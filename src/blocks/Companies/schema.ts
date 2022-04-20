import {BaseProps, AnimatableProps, withTheme} from '../../schema/common';

export const CompaniesBlock = {
    'companies-block': {
        additionalProperties: false,
        required: ['title', 'images'],
        properties: {
            ...BaseProps,
            ...AnimatableProps,
            title: {
                type: 'string',
            },
            images: withTheme({
                type: 'object',
                required: ['desktop', 'tablet', 'mobile'],
                properties: {
                    desktop: {
                        type: 'string',
                    },
                    tablet: {
                        type: 'string',
                    },
                    mobile: {
                        type: 'string',
                    },
                    alt: {
                        type: 'string',
                    },
                },
            }),
        },
    },
};
