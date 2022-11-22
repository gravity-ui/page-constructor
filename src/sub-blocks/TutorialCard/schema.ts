import {BaseProps} from '../../schema/validators/common';
import {ImageProps} from '../../components/Image/schema';

export const TutorialCard = {
    'tutorial-card': {
        additionalProperties: false,
        required: ['url', 'title', 'text'],
        properties: {
            ...BaseProps,
            url: {
                type: 'string',
            },
            title: {
                type: 'string',
                contentType: 'text',
            },
            text: {
                type: 'string',
                contentType: 'text',
            },
            icon: ImageProps,
        },
    },
};
