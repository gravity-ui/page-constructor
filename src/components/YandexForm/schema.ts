import {BaseProps} from '../../gravity-blocks/schema/validators/common';

export const YandexFormProps = {
    type: 'object',
    required: ['id'],
    properties: {
        ...BaseProps,
        id: {
            type: 'string',
        },
        containerId: {
            type: 'string',
        },
    },
};
