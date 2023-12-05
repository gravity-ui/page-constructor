import pick from 'lodash/pick';

import {BaseProps, ButtonBlock, CardBase, LinkProps} from '../../schema/validators/common';
import {ContentBase} from '../Content/schema';

const PriceCardContentProps = pick(ContentBase, ['theme']);

export const PriceCardBlock = {
    'price-card': {
        additionalProperties: false,
        required: ['title', 'price'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...PriceCardContentProps,
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
