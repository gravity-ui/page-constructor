import _ from 'lodash';

import {BaseProps, CardBase} from '../../schema/validators/common';
import {ContentBase} from '../Content/schema';
import {ImageProps} from '../../components/Image/schema';

const BasicCardContentProps = _.omit(ContentBase, ['size', 'theme']);

export const BasicCard = {
    'basic-card': {
        additionalProperties: false,
        required: ['url'],
        properties: {
            ...BaseProps,
            ...CardBase,
            ...BasicCardContentProps,
            url: {
                type: 'string',
            },
            icon: ImageProps,
            target: {
                type: 'string',
                enum: ['_blank', '_parent', '_top', '_self'],
            },
        },
    },
};
