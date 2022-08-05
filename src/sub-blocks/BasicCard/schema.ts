import _ from 'lodash';

import {BaseProps, ImageProps} from '../../schema/validators/common';
import {CardBase} from '../../components/CardBase/schema';
import {ContentBase} from '../Content/schema';

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
        },
    },
};
