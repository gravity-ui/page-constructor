import _ from 'lodash';

import {AnimatableProps, BaseProps, LinkProps, ThemeProps} from '../../schema/validators/common';
import {filteredArray} from '../../schema/validators/utils';
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
                contentType: 'text',
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
                        contentType: 'text',
                    },
                    link: _.pick(LinkProps, ['text', 'url']),
                },
            }),
        },
    },
};
