export const gaEvents = {
    type: 'array',
    items: {
        type: 'object',
        required: ['eventName'],
        additionalProperties: false,
        properties: {
            eventName: {
                type: 'string',
            },
            eventCategory: {
                type: 'string',
            },
            eventLabel: {
                type: 'string',
            },
            value: {
                type: 'number',
            },
            groups: {
                oneOf: [
                    {type: 'string'},
                    {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                ],
            },
            sendTo: {
                oneOf: [
                    {type: 'string'},
                    {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                    },
                ],
            },
            eventTimeout: {
                type: 'number',
            },
        },
    },
};
