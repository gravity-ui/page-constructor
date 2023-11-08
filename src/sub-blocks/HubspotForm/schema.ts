import {BaseProps} from '../../schema/validators/common';

export const HubspotFormProps = {
    type: 'object',
    required: ['portalId', 'formId'],
    properties: {
        ...BaseProps,
        region: {
            type: 'string',
        },
        portalId: {
            type: 'string',
        },
        formId: {
            type: 'string',
        },
        formInstanceId: {
            type: 'string',
        },
    },
};
