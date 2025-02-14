import {JSONSchemaType} from 'ajv';

import {
    ArrayBaseInput,
    BooleanInput,
    ConfigInput,
    NumberInput,
    ObjectInput,
    SelectBaseInput,
    TextAreaInput,
    TextInput,
} from '../common/types';

export const generateFromAJV = (schema: JSONSchemaType<{}>): ConfigInput[] => {
    if (schema && schema.properties) {
        const obj = Object.entries(schema.properties).map(([key, value]) => {
            const innerSchema = value as JSONSchemaType<{}>;
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return generateSingleEntity(key, innerSchema);
        });

        return obj.filter(Boolean) as ConfigInput[];
    }
    return [];
};

export const generateSingleEntity = (key: string, schema: JSONSchemaType<{}>) => {
    const type = schema.type;

    if (!type && schema.enum) {
        return {
            type: 'select',
            view: 'select',
            name: key,
            title: key,
            enum: schema.enum.map((enumValue: string) => ({
                content: enumValue,
                value: enumValue,
            })),
        } as SelectBaseInput;
    }

    if (schema.oneOf) {
        return {
            type: 'oneOf',
            name: key,
            title: key,
            options: schema.oneOf.map((item: JSONSchemaType<{}>) => {
                let properties;
                if (item.properties) {
                    properties = generateFromAJV(item);
                } else {
                    properties = [
                        generateSingleEntity('', {
                            ...item,
                            name: '',
                            title: item.optionName,
                        }),
                    ];
                }

                return {
                    value: item.optionName,
                    title: item.optionName,
                    properties: properties,
                };
            }),
        };
    }

    switch (type) {
        case 'string': {
            if (schema.inputType === 'textarea') {
                return {
                    type: 'textarea',
                    name: key,
                    title: key,
                } as TextAreaInput;
            }
            if (schema.enum) {
                return {
                    type: 'select',
                    view: 'select',
                    name: key,
                    title: key,
                    enum: schema.enum.map((enumValue: string) => ({
                        content: enumValue,
                        value: enumValue,
                    })),
                } as SelectBaseInput;
            }
            return {
                type: 'text',
                name: key,
                title: key,
            } as TextInput;
        }
        case 'number': {
            return {
                type: 'number',
                name: key,
                title: key,
            } as NumberInput;
        }
        case 'object': {
            return {
                type: 'object',
                name: key,
                title: key,
                properties: generateFromAJV(schema),
            } as ObjectInput;
        }
        case 'boolean': {
            return {
                type: 'boolean',
                name: key,
                title: key,
                properties: generateFromAJV(schema),
            } as BooleanInput;
        }
        case 'array': {
            if (schema.items.type === 'string') {
                return {
                    type: 'array',
                    name: key,
                    title: key,
                    properties: generateFromAJV(schema.items),
                    buttonText: 'Add',
                    arrayType: 'text',
                } as ArrayBaseInput;
            }

            return {
                type: 'array',
                name: key,
                title: key,
                properties: generateFromAJV(schema.items),
                buttonText: 'Add',
                arrayType: 'object',
            } as ArrayBaseInput;
        }
    }

    return undefined;
};
