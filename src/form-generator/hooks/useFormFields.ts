import * as React from 'react';
import {AnyOfInput, ConfigInput, ObjectInput, OneOfInput} from '../../editor-v2';
import {FormArrayField, FormField} from './types';

export const useFormFields = () => {
    const [formFields, setFormFields] = React.useState<FormField[]>([]);

    const [nextId, setNextId] = React.useState<number>(1);

    const generateId = () => {
        const id = `field_id_${nextId}`;
        setNextId((prev) => prev + 1);
        return id;
    };

    const generateName = () => {
        const name = `field_${nextId}`;
        return name;
    };

    const createField = (type: ConfigInput['type'], name = ''): FormField => {
        const fieldName = name || generateName();
        const fieldId = generateId();
        let newField: FormField;

        switch (type) {
            case 'text':
                newField = {
                    type: 'text',
                    name: fieldName,
                    title: 'Text Input',
                    id: fieldId,
                } as FormField;
                break;
            case 'number':
                newField = {
                    type: 'number',
                    name: fieldName,
                    title: 'Number Input',
                    id: fieldId,
                } as FormField;
                break;
            case 'boolean':
                newField = {
                    type: 'boolean',
                    name: fieldName,
                    title: 'Boolean Input',
                    id: fieldId,
                } as FormField;
                break;
            case 'textarea':
                newField = {
                    type: 'textarea',
                    name: fieldName,
                    title: 'Textarea Input',
                    id: fieldId,
                } as FormField;
                break;
            case 'select':
                newField = {
                    type: 'select',
                    name: fieldName,
                    title: 'Select Input',
                    view: 'select',
                    mode: 'single',
                    enum: [
                        {content: 'Option 1', value: 'option1'},
                        {content: 'Option 2', value: 'option2'},
                    ],
                    id: fieldId,
                } as FormField;
                break;
            case 'object':
                newField = {
                    type: 'object',
                    name: fieldName,
                    title: 'Object Input',
                    properties: [
                        {
                            type: 'text',
                            name: 'property1',
                            title: 'Property 1',
                            id: generateId(),
                        } as FormField,
                    ],
                    id: fieldId,
                } as FormField;
                break;
            case 'array':
                newField = {
                    type: 'array',
                    name: fieldName,
                    title: 'Array Input',
                    buttonText: 'Add Item',
                    arrayType: 'text',
                    id: fieldId,
                } as FormField;
                break;
            case 'oneOf':
                newField = {
                    type: 'oneOf',
                    name: fieldName,
                    title: 'OneOf Input',
                    options: [
                        {
                            title: 'Option A',
                            value: 'optionA',
                            properties: [
                                {
                                    type: 'text',
                                    name: 'textField',
                                    title: 'Text Field',
                                    id: generateId(),
                                } as FormField,
                            ],
                        },
                        {
                            title: 'Option B',
                            value: 'optionB',
                            properties: [
                                {
                                    type: 'number',
                                    name: 'numberField',
                                    title: 'Number Field',
                                    id: generateId(),
                                } as FormField,
                            ],
                        },
                    ],
                    id: fieldId,
                } as FormField;
                break;
            case 'anyOf':
                newField = {
                    type: 'anyOf',
                    name: fieldName,
                    title: 'AnyOf Input',
                    options: [
                        {
                            title: 'Option A',
                            value: 'optionA',
                            properties: [
                                {
                                    type: 'text',
                                    name: 'textField',
                                    title: 'Text Field',
                                    id: generateId(),
                                } as FormField,
                            ],
                        },
                        {
                            title: 'Option B',
                            value: 'optionB',
                            properties: [
                                {
                                    type: 'boolean',
                                    name: 'booleanField',
                                    title: 'Boolean Field',
                                    id: generateId(),
                                } as FormField,
                            ],
                        },
                    ],
                    id: fieldId,
                } as FormField;
                break;
            default:
                return createField('text', fieldName);
        }

        return newField;
    };

    const updateFieldById = (
        fields: FormField[],
        fieldId: string,
        updates: Partial<ConfigInput>,
    ): FormField[] => {
        return fields.map((field) => {
            if (field.id === fieldId) {
                return {...field, ...updates} as FormField;
            }

            if (field.type === 'object' && (field as ObjectInput).properties) {
                const objectField = field as ObjectInput;
                return {
                    ...field,
                    properties: updateFieldById(
                        objectField.properties as FormField[],
                        fieldId,
                        updates,
                    ),
                } as FormField;
            }

            if (
                (field.type === 'oneOf' || field.type === 'anyOf') &&
                (field as OneOfInput | AnyOfInput).options
            ) {
                const optionsField = field as OneOfInput | AnyOfInput;
                return {
                    ...field,
                    options: optionsField.options.map((option) => ({
                        ...option,
                        properties: updateFieldById(
                            option.properties as FormField[],
                            fieldId,
                            updates,
                        ),
                    })),
                } as FormField;
            }

            if (field.type === 'array' && field.arrayType === 'object') {
                const arrayField = field as FormArrayField;
                return {
                    ...field,
                    properties: updateFieldById(
                        arrayField.properties as FormField[],
                        fieldId,
                        updates,
                    ),
                } as FormField;
            }

            return field;
        });
    };

    const addField = (type: ConfigInput['type']) => {
        const newField = createField(type);
        setFormFields((prev) => [...prev, newField] as FormField[]);
    };

    const removeField = (fieldId: string) => {
        setFormFields((prev) => prev.filter((field) => field.id !== fieldId) as FormField[]);
    };

    const updateField = (fieldId: string, updates: Partial<ConfigInput>) => {
        setFormFields((prev) => updateFieldById(prev, fieldId, updates));
    };

    const addPropertyToObjectById = (
        fields: FormField[],
        objectId: string,
        type: ConfigInput['type'] = 'text',
    ): FormField[] => {
        return fields.map((field) => {
            if (field.id === objectId && field.type === 'object') {
                const objectField = field as ObjectInput;
                const propertyName = `property${(objectField.properties?.length || 0) + 1}`;
                const newProperty = createField(type, propertyName);

                return {
                    ...field,
                    properties: [...(objectField.properties || []), newProperty],
                } as FormField;
            }

            if (field.type === 'object' && (field as ObjectInput).properties) {
                const objectField = field as ObjectInput;
                return {
                    ...field,
                    properties: addPropertyToObjectById(
                        objectField.properties as FormField[],
                        objectId,
                        type,
                    ),
                } as FormField;
            }

            if (
                (field.type === 'oneOf' || field.type === 'anyOf') &&
                (field as OneOfInput | AnyOfInput).options
            ) {
                const optionsField = field as OneOfInput | AnyOfInput;
                return {
                    ...field,
                    options: optionsField.options.map((option) => ({
                        ...option,
                        properties: addPropertyToObjectById(
                            option.properties as FormField[],
                            objectId,
                            type,
                        ),
                    })),
                } as FormField;
            }

            if (field.type === 'array' && field.arrayType === 'object') {
                const arrayField = field as FormArrayField;

                if (field.id === objectId) {
                    const propertyName = `property${(arrayField.properties?.length || 0) + 1}`;
                    const newProperty = createField(type, propertyName);

                    return {
                        ...field,
                        properties: [...(arrayField.properties || []), newProperty],
                    } as FormField;
                }

                if (arrayField.properties && arrayField.properties.length > 0) {
                    return {
                        ...field,
                        properties: addPropertyToObjectById(arrayField.properties, objectId, type),
                    } as FormField;
                }
            }

            return field;
        });
    };

    const addObjectProperty = (objectId: string, type: ConfigInput['type'] = 'text') => {
        setFormFields((prev) => addPropertyToObjectById(prev, objectId, type));
    };

    const addOptionProperty = (
        fieldId: string,
        optionIndex: number,
        type: ConfigInput['type'] = 'text',
    ) => {
        const addPropertyToOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
        ): FormField[] => {
            return fields.map((field) => {
                if (
                    field.id === targetFieldId &&
                    (field.type === 'oneOf' || field.type === 'anyOf')
                ) {
                    const updatedField = JSON.parse(JSON.stringify(field));
                    const options = updatedField.options;

                    if (
                        options &&
                        Array.isArray(options) &&
                        targetOptionIndex >= 0 &&
                        targetOptionIndex < options.length &&
                        options[targetOptionIndex].properties
                    ) {
                        const propertyName = `property${options[targetOptionIndex].properties.length + 1}`;
                        const newProperty = createField(type, propertyName);

                        options[targetOptionIndex].properties.push(newProperty);
                    }

                    return updatedField;
                }

                if (field.type === 'object' && (field as ObjectInput).properties) {
                    const objectField = field as ObjectInput;
                    return {
                        ...field,
                        properties: addPropertyToOptionRecursive(
                            objectField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                        ),
                    } as FormField;
                }

                if (
                    (field.type === 'oneOf' || field.type === 'anyOf') &&
                    (field as OneOfInput | AnyOfInput).options
                ) {
                    const optionsField = field as OneOfInput | AnyOfInput;
                    return {
                        ...field,
                        options: optionsField.options.map((option) => ({
                            ...option,
                            properties: addPropertyToOptionRecursive(
                                option.properties as FormField[],
                                targetFieldId,
                                targetOptionIndex,
                            ),
                        })),
                    } as FormField;
                }

                if (
                    field.type === 'array' &&
                    field.arrayType === 'object' &&
                    (field as FormArrayField).properties
                ) {
                    const arrayField = field as FormArrayField;
                    return {
                        ...field,
                        properties: addPropertyToOptionRecursive(
                            arrayField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                        ),
                    } as FormField;
                }

                return field;
            });
        };

        setFormFields((prev) => addPropertyToOptionRecursive(prev, fieldId, optionIndex));
    };

    const removeObjectProperty = (fieldId: string, propertyIndex: number) => {
        setFormFields((prev) => {
            return prev.map((field) => {
                if (field.id !== fieldId) return field;

                const updatedField = JSON.parse(JSON.stringify(field));
                const objectInput = updatedField as ObjectInput;

                objectInput.properties.splice(propertyIndex, 1);

                return updatedField;
            }) as FormField[];
        });
    };

    const removeOptionProperty = (fieldId: string, optionIndex: number, propertyIndex: number) => {
        const removePropertyFromOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
            targetPropertyIndex: number,
        ): FormField[] => {
            return fields.map((field) => {
                if (
                    field.id === targetFieldId &&
                    (field.type === 'oneOf' || field.type === 'anyOf')
                ) {
                    const updatedField = JSON.parse(JSON.stringify(field));
                    const options = updatedField.options;

                    if (
                        options &&
                        Array.isArray(options) &&
                        targetOptionIndex >= 0 &&
                        targetOptionIndex < options.length &&
                        options[targetOptionIndex].properties &&
                        targetPropertyIndex >= 0 &&
                        targetPropertyIndex < options[targetOptionIndex].properties.length
                    ) {
                        options[targetOptionIndex].properties.splice(targetPropertyIndex, 1);
                    }

                    return updatedField;
                }

                if (field.type === 'object' && (field as ObjectInput).properties) {
                    const objectField = field as ObjectInput;
                    return {
                        ...field,
                        properties: removePropertyFromOptionRecursive(
                            objectField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                            targetPropertyIndex,
                        ),
                    } as FormField;
                }

                if (
                    (field.type === 'oneOf' || field.type === 'anyOf') &&
                    (field as OneOfInput | AnyOfInput).options
                ) {
                    const optionsField = field as OneOfInput | AnyOfInput;
                    return {
                        ...field,
                        options: optionsField.options.map((option) => ({
                            ...option,
                            properties: removePropertyFromOptionRecursive(
                                option.properties as FormField[],
                                targetFieldId,
                                targetOptionIndex,
                                targetPropertyIndex,
                            ),
                        })),
                    } as FormField;
                }

                if (
                    field.type === 'array' &&
                    field.arrayType === 'object' &&
                    (field as FormArrayField).properties
                ) {
                    const arrayField = field as FormArrayField;
                    return {
                        ...field,
                        properties: removePropertyFromOptionRecursive(
                            arrayField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                            targetPropertyIndex,
                        ),
                    } as FormField;
                }

                return field;
            });
        };

        setFormFields((prev) =>
            removePropertyFromOptionRecursive(prev, fieldId, optionIndex, propertyIndex),
        );
    };

    const updateObjectProperty = (
        fieldId: string,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => {
        setFormFields((prev) => {
            return prev.map((field) => {
                if (field.id !== fieldId) return field;

                const updatedField = JSON.parse(JSON.stringify(field));
                const objectInput = updatedField as ObjectInput;

                objectInput.properties[propertyIndex] = {
                    ...objectInput.properties[propertyIndex],
                    ...updates,
                } as ConfigInput;

                return updatedField;
            }) as FormField[];
        });
    };

    const updateOptionProperty = (
        fieldId: string,
        optionIndex: number,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => {
        const updatePropertyInOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
            targetPropertyIndex: number,
            propertyUpdates: Partial<ConfigInput>,
        ): FormField[] => {
            return fields.map((field) => {
                if (
                    field.id === targetFieldId &&
                    (field.type === 'oneOf' || field.type === 'anyOf')
                ) {
                    const updatedField = JSON.parse(JSON.stringify(field));
                    const options = updatedField.options;

                    if (
                        options &&
                        Array.isArray(options) &&
                        targetOptionIndex >= 0 &&
                        targetOptionIndex < options.length &&
                        options[targetOptionIndex].properties &&
                        targetPropertyIndex >= 0 &&
                        targetPropertyIndex < options[targetOptionIndex].properties.length
                    ) {
                        options[targetOptionIndex].properties[targetPropertyIndex] = {
                            ...options[targetOptionIndex].properties[targetPropertyIndex],
                            ...propertyUpdates,
                        } as ConfigInput;
                    }

                    return updatedField;
                }

                if (field.type === 'object' && (field as ObjectInput).properties) {
                    const objectField = field as ObjectInput;
                    return {
                        ...field,
                        properties: updatePropertyInOptionRecursive(
                            objectField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                            targetPropertyIndex,
                            propertyUpdates,
                        ),
                    } as FormField;
                }

                if (
                    (field.type === 'oneOf' || field.type === 'anyOf') &&
                    (field as OneOfInput | AnyOfInput).options
                ) {
                    const optionsField = field as OneOfInput | AnyOfInput;
                    return {
                        ...field,
                        options: optionsField.options.map((option) => ({
                            ...option,
                            properties: updatePropertyInOptionRecursive(
                                option.properties as FormField[],
                                targetFieldId,
                                targetOptionIndex,
                                targetPropertyIndex,
                                propertyUpdates,
                            ),
                        })),
                    } as FormField;
                }

                if (
                    field.type === 'array' &&
                    field.arrayType === 'object' &&
                    (field as FormArrayField).properties
                ) {
                    const arrayField = field as FormArrayField;
                    return {
                        ...field,
                        properties: updatePropertyInOptionRecursive(
                            arrayField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                            targetPropertyIndex,
                            propertyUpdates,
                        ),
                    } as FormField;
                }

                return field;
            });
        };

        setFormFields((prev) =>
            updatePropertyInOptionRecursive(prev, fieldId, optionIndex, propertyIndex, updates),
        );
    };

    const addOption = (fieldId: string) => {
        const addOptionRecursive = (fields: FormField[], targetFieldId: string): FormField[] => {
            return fields.map((field) => {
                if (
                    field.id === targetFieldId &&
                    (field.type === 'oneOf' || field.type === 'anyOf')
                ) {
                    const updatedField = JSON.parse(JSON.stringify(field));
                    const options = updatedField.options;

                    if (options && Array.isArray(options)) {
                        const optionLetter = String.fromCharCode(65 + options.length);
                        const newOption = {
                            title: `Option ${optionLetter}`,
                            value: `option${optionLetter.toLowerCase()}`,
                            properties: [
                                {
                                    type: 'text',
                                    name: 'textField',
                                    title: 'Text Field',
                                    id: generateId(),
                                } as FormField,
                            ],
                        };

                        options.push(newOption);
                    }

                    return updatedField;
                }

                if (field.type === 'object' && (field as ObjectInput).properties) {
                    const objectField = field as ObjectInput;
                    return {
                        ...field,
                        properties: addOptionRecursive(
                            objectField.properties as FormField[],
                            targetFieldId,
                        ),
                    } as FormField;
                }

                if (
                    (field.type === 'oneOf' || field.type === 'anyOf') &&
                    (field as OneOfInput | AnyOfInput).options
                ) {
                    const optionsField = field as OneOfInput | AnyOfInput;
                    return {
                        ...field,
                        options: optionsField.options.map((option) => ({
                            ...option,
                            properties: addOptionRecursive(
                                option.properties as FormField[],
                                targetFieldId,
                            ),
                        })),
                    } as FormField;
                }

                if (
                    field.type === 'array' &&
                    field.arrayType === 'object' &&
                    (field as FormArrayField).properties
                ) {
                    const arrayField = field as FormArrayField;
                    return {
                        ...field,
                        properties: addOptionRecursive(
                            arrayField.properties as FormField[],
                            targetFieldId,
                        ),
                    } as FormField;
                }

                return field;
            });
        };

        setFormFields((prev) => addOptionRecursive(prev, fieldId));
    };

    const removeOption = (fieldId: string, optionIndex: number) => {
        const removeOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
        ): FormField[] => {
            return fields.map((field) => {
                if (
                    field.id === targetFieldId &&
                    (field.type === 'oneOf' || field.type === 'anyOf')
                ) {
                    const updatedField = JSON.parse(JSON.stringify(field));
                    const options = updatedField.options;

                    if (
                        options &&
                        Array.isArray(options) &&
                        targetOptionIndex >= 0 &&
                        targetOptionIndex < options.length
                    ) {
                        if (options.length > 1) {
                            options.splice(targetOptionIndex, 1);
                        }
                    }

                    return updatedField;
                }

                if (field.type === 'object' && (field as ObjectInput).properties) {
                    const objectField = field as ObjectInput;
                    return {
                        ...field,
                        properties: removeOptionRecursive(
                            objectField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                        ),
                    } as FormField;
                }

                if (
                    (field.type === 'oneOf' || field.type === 'anyOf') &&
                    (field as OneOfInput | AnyOfInput).options
                ) {
                    const optionsField = field as OneOfInput | AnyOfInput;
                    return {
                        ...field,
                        options: optionsField.options.map((option) => ({
                            ...option,
                            properties: removeOptionRecursive(
                                option.properties as FormField[],
                                targetFieldId,
                                targetOptionIndex,
                            ),
                        })),
                    } as FormField;
                }

                if (
                    field.type === 'array' &&
                    field.arrayType === 'object' &&
                    (field as FormArrayField).properties
                ) {
                    const arrayField = field as FormArrayField;
                    return {
                        ...field,
                        properties: removeOptionRecursive(
                            arrayField.properties as FormField[],
                            targetFieldId,
                            targetOptionIndex,
                        ),
                    } as FormField;
                }

                return field;
            });
        };

        setFormFields((prev) => removeOptionRecursive(prev, fieldId, optionIndex));
    };

    const resetForm = () => {
        setFormFields([]);
    };

    return {
        formFields,
        createField,
        addField,
        removeField,
        updateField,
        addObjectProperty,
        addOptionProperty,
        removeObjectProperty,
        removeOptionProperty,
        updateObjectProperty,
        updateOptionProperty,
        addOption,
        removeOption,
        resetForm,
    };
};
