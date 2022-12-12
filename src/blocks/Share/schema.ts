import {filteredArray} from '../../schema/validators/utils';
import {BaseProps} from '../../schema/validators/common';

export const ShareBlock = {
    'share-block': {
        additionalProperties: false,
        required: ['items'],
        properties: {
            ...BaseProps,
            title: {
                type: 'string',
            },
            items: filteredArray({
                properties: {
                    type: 'string',
                    enum: ['telegram', 'facebook', 'twitter', 'vk'],
                },
            }),
        },
    },
};
