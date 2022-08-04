import {PixelEventType} from '../../models';

const LeadData = {
    Lead: {
        additionalProperties: false,
        properties: {
            name: {},
            data: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    content_category: {
                        type: 'string',
                    },
                    content_name: {
                        type: 'string',
                    },
                    currency: {
                        type: 'string',
                    },
                    value: {
                        type: 'number',
                    },
                },
            },
        },
    },
};

const ContactData = {
    Contact: {
        additionalProperties: false,
        properties: {
            name: {},
        },
    },
};

const SubmitApplicationData = {
    SubmitApplication: {
        additionalProperties: false,
        properties: {
            name: {},
        },
    },
};

export const pixelEvents = {
    type: 'array',
    items: {
        type: 'object',
        required: ['name'],
        additionalProperties: false,
        properties: {
            name: {
                type: 'string',
                enum: Object.values(PixelEventType),
            },
            data: {},
        },
        select: {$data: '0/name'},
        selectCases: {
            ...LeadData,
            ...ContactData,
            ...SubmitApplicationData,
        },
    },
};
