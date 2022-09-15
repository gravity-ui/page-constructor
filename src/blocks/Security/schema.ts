import _ from 'lodash';

import {filteredArray} from '../../schema/validators/utils';
import {BaseProps, AnimatableProps, LinkProps, ThemeProps} from '../../schema/validators/common';
import {Media} from '../Media/schema';

export const SecurityBlock = {
    'security-block': {
        additionalProperties: false,
        required: ['title', 'media'],
        properties: {
            ...BaseProps,
            ...AnimatableProps,
            theme: ThemeProps,
            backgroundColor: {
                type: 'string',
            },
            title: {
                type: 'string',
            },
            media: Media,
            points: filteredArray({
                type: 'object',
                properties: {
                    img: {
                        type: 'string',
                    },
                    text: {
                        type: 'string',
                    },
                    link: _.pick(LinkProps, ['text', 'url']),
                },
            }),
        },
    },
};
