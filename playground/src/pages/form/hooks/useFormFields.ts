import * as React from 'react';
import {set} from 'lodash';
import {AnyOfInput, ConfigInput, ObjectInput, OneOfInput} from '../../../../../src/editor-v2';
import {ContentConfig, FormArrayField, FormField} from './types';

// Key for storing form data in localStorage
const FORM_STORAGE_KEY = 'formBuilder_fields';
const FORM_ID_COUNTER_KEY = 'formBuilder_nextId';

export const useFormFields = () => {
    // Initialize state from localStorage if available
    const [formFields, setFormFields] = React.useState<FormField[]>(() => {
        try {
            const savedFields = localStorage.getItem(FORM_STORAGE_KEY);
            return savedFields ? JSON.parse(savedFields) : [];
        } catch (error) {
            console.error('Error loading form fields from localStorage:', error);
            return [];
        }
    });

    // Отслеживаем изменения formFields
    React.useEffect(() => {
        console.log('formFields updated:', formFields);
    }, [formFields]);

    const [nextId, setNextId] = React.useState<number>(() => {
        try {
            const savedNextId = localStorage.getItem(FORM_ID_COUNTER_KEY);
            return savedNextId ? parseInt(savedNextId, 10) : 1;
        } catch (error) {
            console.error('Error loading next ID from localStorage:', error);
            return 1;
        }
    });

    const [contentConfig, setContentConfig] = React.useState<ContentConfig>({});

    // Save form fields to localStorage whenever they change
    React.useEffect(() => {
        try {
            localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formFields));
        } catch (error) {
            console.error('Error saving form fields to localStorage:', error);
        }
    }, [formFields]);

    // Save next ID to localStorage whenever it changes
    React.useEffect(() => {
        try {
            localStorage.setItem(FORM_ID_COUNTER_KEY, nextId.toString());
        } catch (error) {
            console.error('Error saving next ID to localStorage:', error);
        }
    }, [nextId]);

    // Helper function to set nested object properties using dot notation
    /**
     * Sets a value at a nested path within an object using dot notation.
     * Uses lodash's set method for reliable deep property setting.
     *
     * @param obj - The source object to modify
     * @param path - Dot-separated path to the target property
     * @param value - The value to set at the specified path
     * @returns The modified object
     */
    const setNestedProperty = <T extends Record<string, unknown>>(
        obj: T,
        path: string,
        value: unknown,
    ): T => {
        return set({...obj}, path, value);
    };

    const handleFormUpdate = (key: string, value: unknown) => {
        setContentConfig((prev) => {
            const newConfig = JSON.parse(JSON.stringify(prev)); // Deep clone
            return setNestedProperty(newConfig, key, value);
        });
    };

    // Generate a unique ID for new fields
    const generateId = () => {
        const id = `field_id_${nextId}`;
        setNextId((prev) => prev + 1);
        return id;
    };

    // Generate a unique name for new fields
    const generateName = () => {
        const name = `field_${nextId}`;
        return name;
    };

    // Create a new field configuration based on type
    const createField = (type: ConfigInput['type'], name = ''): FormField => {
        console.log('createField called with:', {type, name});

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

        console.log('Created new field:', newField);
        return newField;
    };

    // Helper function to update a field by ID in a nested structure
    const updateFieldById = (
        fields: FormField[],
        fieldId: string,
        updates: Partial<ConfigInput>,
    ): FormField[] => {
        return fields.map((field) => {
            // If this is the field we're looking for, update it
            if (field.id === fieldId) {
                return {...field, ...updates} as FormField;
            }

            // Check if this field has properties (for object type)
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

            // Check if this field has options (for oneOf/anyOf types)
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

            // Check if this field has array items with properties
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

    // Add a top-level field
    const addField = (type: ConfigInput['type']) => {
        const newField = createField(type);
        setFormFields((prev) => [...prev, newField] as FormField[]);
    };

    // Remove a field
    const removeField = (fieldId: string) => {
        setFormFields((prev) => prev.filter((field) => field.id !== fieldId) as FormField[]);
    };

    // Update a field - now using the field's ID for stability and supporting nested fields
    const updateField = (fieldId: string, updates: Partial<ConfigInput>) => {
        setFormFields((prev) => updateFieldById(prev, fieldId, updates));
    };

    // Helper function to add a property to an object field by ID
    const addPropertyToObjectById = (
        fields: FormField[],
        objectId: string,
        type: ConfigInput['type'] = 'text',
    ): FormField[] => {
        return fields.map((field) => {
            // If this is the object field we're looking for, add the property to it
            if (field.id === objectId && field.type === 'object') {
                const objectField = field as ObjectInput;
                const propertyName = `property${(objectField.properties?.length || 0) + 1}`;
                const newProperty = createField(type, propertyName);

                return {
                    ...field,
                    properties: [...(objectField.properties || []), newProperty],
                } as FormField;
            }

            // Check if this field has properties (for object type)
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

            // Check if this field has options (for oneOf/anyOf types)
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

            // Check if this field has array items with properties
            if (field.type === 'array' && field.arrayType === 'object') {
                const arrayField = field as FormArrayField;

                // If this is the array field we're looking for, add the property to it
                if (field.id === objectId) {
                    const propertyName = `property${(arrayField.properties?.length || 0) + 1}`;
                    const newProperty = createField(type, propertyName);

                    return {
                        ...field,
                        properties: [...(arrayField.properties || []), newProperty],
                    } as FormField;
                }

                // Otherwise, recursively search through existing properties if they exist
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

    // Add a field to an object's properties - now using the object's ID
    const addObjectProperty = (objectId: string, type: ConfigInput['type'] = 'text') => {
        setFormFields((prev) => addPropertyToObjectById(prev, objectId, type));
    };

    // Add a field to a oneOf/anyOf option's properties
    const addOptionProperty = (
        fieldId: string,
        optionIndex: number,
        isOneOf: boolean,
        type: ConfigInput['type'] = 'text',
    ) => {
        console.log('addOptionProperty called with:', {fieldId, optionIndex, isOneOf, type});

        // Функция для рекурсивного поиска и обновления поля
        const addPropertyToOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
        ): FormField[] => {
            return fields.map((field) => {
                // Если это искомое поле, добавляем свойство к указанной опции
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
                        // Создаем новое свойство
                        const propertyName = `property${options[targetOptionIndex].properties.length + 1}`;
                        const newProperty = createField(type, propertyName);

                        // Добавляем свойство в опцию
                        options[targetOptionIndex].properties.push(newProperty);
                    }

                    return updatedField;
                }

                // Проверяем вложенные объекты
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

                // Проверяем вложенные oneOf/anyOf
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

                // Проверяем массивы с объектными свойствами
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

        // Применяем рекурсивную функцию ко всем полям формы
        setFormFields((prev) => addPropertyToOptionRecursive(prev, fieldId, optionIndex));
    };

    // Remove a property from an object
    const removeObjectProperty = (fieldId: string, propertyIndex: number) => {
        setFormFields((prev) => {
            return prev.map((field) => {
                if (field.id !== fieldId) return field;

                const updatedField = JSON.parse(JSON.stringify(field)); // Deep clone
                const objectInput = updatedField as ObjectInput;

                // Remove the property at the specified index
                objectInput.properties.splice(propertyIndex, 1);

                return updatedField;
            }) as FormField[];
        });
    };

    // Remove a property from a oneOf/anyOf option
    const removeOptionProperty = (fieldId: string, optionIndex: number, propertyIndex: number) => {
        // Функция для рекурсивного поиска и удаления свойства
        const removePropertyFromOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
            targetPropertyIndex: number,
        ): FormField[] => {
            return fields.map((field) => {
                // Если это искомое поле, удаляем свойство из указанной опции
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
                        // Удаляем свойство из опции
                        options[targetOptionIndex].properties.splice(targetPropertyIndex, 1);
                    }

                    return updatedField;
                }

                // Проверяем вложенные объекты
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

                // Проверяем вложенные oneOf/anyOf
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

                // Проверяем массивы с объектными свойствами
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

        // Применяем рекурсивную функцию ко всем полям формы
        setFormFields((prev) =>
            removePropertyFromOptionRecursive(prev, fieldId, optionIndex, propertyIndex),
        );
    };

    // Update a property in an object
    const updateObjectProperty = (
        fieldId: string,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => {
        setFormFields((prev) => {
            return prev.map((field) => {
                if (field.id !== fieldId) return field;

                const updatedField = JSON.parse(JSON.stringify(field)); // Deep clone
                const objectInput = updatedField as ObjectInput;

                // Update the property at the specified index
                objectInput.properties[propertyIndex] = {
                    ...objectInput.properties[propertyIndex],
                    ...updates,
                } as ConfigInput;

                return updatedField;
            }) as FormField[];
        });
    };

    // Update a property in a oneOf/anyOf option
    const updateOptionProperty = (
        fieldId: string,
        optionIndex: number,
        propertyIndex: number,
        updates: Partial<ConfigInput>,
    ) => {
        // Функция для рекурсивного поиска и обновления свойства
        const updatePropertyInOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
            targetPropertyIndex: number,
            propertyUpdates: Partial<ConfigInput>,
        ): FormField[] => {
            return fields.map((field) => {
                // Если это искомое поле, обновляем свойство в указанной опции
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
                        // Обновляем свойство в опции
                        options[targetOptionIndex].properties[targetPropertyIndex] = {
                            ...options[targetOptionIndex].properties[targetPropertyIndex],
                            ...propertyUpdates,
                        } as ConfigInput;
                    }

                    return updatedField;
                }

                // Проверяем вложенные объекты
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

                // Проверяем вложенные oneOf/anyOf
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

                // Проверяем массивы с объектными свойствами
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

        // Применяем рекурсивную функцию ко всем полям формы
        setFormFields((prev) =>
            updatePropertyInOptionRecursive(prev, fieldId, optionIndex, propertyIndex, updates),
        );
    };

    // Add a new option to a oneOf/anyOf field
    const addOption = (fieldId: string) => {
        console.log('addOption called with fieldId:', fieldId);

        // Функция для рекурсивного поиска и добавления опции
        const addOptionRecursive = (fields: FormField[], targetFieldId: string): FormField[] => {
            return fields.map((field) => {
                // Если это искомое поле, добавляем новую опцию
                if (
                    field.id === targetFieldId &&
                    (field.type === 'oneOf' || field.type === 'anyOf')
                ) {
                    const updatedField = JSON.parse(JSON.stringify(field));
                    const options = updatedField.options;

                    if (options && Array.isArray(options)) {
                        // Создаем новую опцию с дефолтным свойством
                        const optionLetter = String.fromCharCode(65 + options.length); // A, B, C, etc.
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

                        // Добавляем новую опцию
                        options.push(newOption);
                    }

                    return updatedField;
                }

                // Проверяем вложенные объекты
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

                // Проверяем вложенные oneOf/anyOf
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

                // Проверяем массивы с объектными свойствами
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

        // Применяем рекурсивную функцию ко всем полям формы
        setFormFields((prev) => addOptionRecursive(prev, fieldId));
    };

    // Remove an option from a oneOf/anyOf field
    const removeOption = (fieldId: string, optionIndex: number) => {
        console.log('removeOption called with:', {fieldId, optionIndex});

        // Функция для рекурсивного поиска и удаления опции
        const removeOptionRecursive = (
            fields: FormField[],
            targetFieldId: string,
            targetOptionIndex: number,
        ): FormField[] => {
            return fields.map((field) => {
                // Если это искомое поле, удаляем опцию
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
                        // Проверяем, что можно удалить опцию (должна остаться хотя бы одна)
                        if (options.length > 1) {
                            // Удаляем опцию по индексу
                            options.splice(targetOptionIndex, 1);
                        }
                    }

                    return updatedField;
                }

                // Проверяем вложенные объекты
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

                // Проверяем вложенные oneOf/anyOf
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

                // Проверяем массивы с объектными свойствами
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

        // Применяем рекурсивную функцию ко всем полям формы
        setFormFields((prev) => removeOptionRecursive(prev, fieldId, optionIndex));
    };

    // Reset the form
    const resetForm = () => {
        setFormFields([]);
        setContentConfig({});
    };

    return {
        formFields,
        contentConfig,
        handleFormUpdate,
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
