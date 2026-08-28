import omit from 'lodash/omit';

import {ImageDeviceProps} from '../../components/Image/schema';
import {AnimatableProps, BlockBaseProps, withTheme} from '../../schema/validators/common';

export const CompaniesBlock = {
    'companies-block': {
        additionalProperties: false,
        required: ['title', 'images'],
        properties: {
            ...BlockBaseProps,
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
            images: withTheme(omit(ImageDeviceProps, ['anyOf'])),
        },
    },
};
