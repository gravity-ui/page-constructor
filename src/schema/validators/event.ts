export const AnalyticsEventSchema = {
    type: 'object',
    additionalProperties: {type: 'string'},
    required: ['name'],
    properties: {
        name: {
            type: 'string',
        },
        type: {
            type: 'string',
        },
        counters: {
            type: 'object',
            additionalProperties: false,
            required: [],
            properties: {
                include: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                exclude: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
            },
        },
        context: {
            type: 'string',
        },
    },
};
