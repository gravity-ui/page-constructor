import {
    AnimatableProps,
    BaseProps,
    ButtonBlock,
    CardBase,
    LinkProps,
    MediaProps,
} from '../../schema/validators/common';

export const PriceCardBlock = {
    'price-card': {
        additionalProperties: false,
        required: ['title', 'price'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...MediaProps,
            ...AnimatableProps,
            title: {
                type: 'string',
            },
            price: {
                type: 'string',
            },
            pricePeriod: {
                type: 'string',
            },
            priceDetails: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            buttons: {
                type: 'array',
                items: ButtonBlock,
            },
            links: {
                type: 'array',
                items: LinkProps,
            },
            backgroundColor: {
                type: 'string',
            },
            list: {
                type: 'array',
                items: {
                    type: 'string',
                },
            },
        },
    },
};
