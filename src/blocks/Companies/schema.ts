import {AnimatableProps, BaseProps, withTheme} from '../../schema/validators/common';

export const CompaniesBlock = {
    'companies-block': {
        additionalProperties: false,
        required: ['title', 'images'],
        properties: {
            ...BaseProps,
            ...AnimatableProps,
            title: {
                type: 'string',
                contentType: 'text',
            },
            description: {
                type: 'string',
                contentType: 'yfm',
                inputType: 'textarea',
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
                        contentType: 'text',
                    },
                },
            }),
        },
    },
};
