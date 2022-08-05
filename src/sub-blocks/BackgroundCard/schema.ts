import {BaseProps, ImageObjectProps} from '../../schema/validators/common';
import {CardBase} from '../../components/CardBase/schema';
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
            background: ImageObjectProps,
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
