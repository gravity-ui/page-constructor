export interface ObjectSchema extends Record<string, unknown> {
    properties: object;
}

export const filteredItem = (itemsSchema: ObjectSchema) => ({
    ...itemsSchema,
    type: 'object',
    properties: {
        when: {
            type: 'string',
        },
        ...itemsSchema.properties,
    },
});

export const filteredArray = (itemsSchema: ObjectSchema) => ({
    type: 'array',
    items: filteredItem(itemsSchema),
});
