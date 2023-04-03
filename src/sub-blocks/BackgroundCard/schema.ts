import _ from 'lodash';

import {ImageObjectProps} from '../../components/Image/schema';
import {BaseProps, CardBase, withTheme} from '../../schema/validators/common';
import {ContentBase} from '../Content/schema';

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
