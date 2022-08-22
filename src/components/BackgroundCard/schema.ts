import {BaseProps, ImageObjectProps, withTheme} from '../../schema/common';
import {CardBase} from '../CardBase/schema';
import {ContentBase} from '../Content/schema';
import _ from 'lodash';

const BackgroundCardContentProps = _.omit(ContentBase, ['size']);

export const BackgroundCard = {
    'background-card': {
        additionalProperties: false,
        required: ['title', 'text'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...BackgroundCardContentProps,
            url: {
                type: 'string',
            },
            background: withTheme(ImageObjectProps),
            backgroundColor: {
                type: 'string',
            },
            paddingBottom: {
                type: 'string',
                enum: ['s', 'm', 'l', 'xl'],
            },
        },
    },
};
