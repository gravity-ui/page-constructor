import * as React from 'react';

import {BuilderFieldType, BuilderSectionField, FieldUpdate, FormField} from '../types';
import {findFieldById} from '../utils/fieldTree';

interface UseFormFieldsProps {
    initialFields: FormField[];
    onChange?: (fields: FormField[]) => void;
}

const createDefaultField = (type: BuilderFieldType, name: string, id: string): FormField => {
    switch (type) {
        case 'textInput':
            return {type, name, title: 'Text input', id};
        case 'textArea':
            return {type, name, title: 'Text area', id};
        case 'switch':
            return {type, name, title: 'Switch', id};
        case 'colorInput':
            return {type, name, title: 'Color', defaultValue: '#000000', id};
        case 'select':
            return {
                type,
                name,
                title: 'Select',
                options: [
                    {value: 'option1', content: 'Option 1'},
                    {value: 'option2', content: 'Option 2'},
                ],
                id,
            };
        case 'segmentedRadioGroup':
            return {
                type,
                name,
                title: 'Segmented radio',
                options: [
                    {value: 'option1', content: 'Option 1'},
                    {value: 'option2', content: 'Option 2'},
                ],
                id,
            };
        case 'text':
            return {type, text: 'Static text', id};
        case 'section':
            return {
                type,
                title: 'Section',
                opened: true,
                fields: [],
                id,
            };
    }
};

const updateFieldDeep = (
    fields: FormField[],
    fieldId: string,
    updates: FieldUpdate,
): FormField[] => {
    return fields.map((field) => {
        if (field.id === fieldId) {
            return {
                ...(field as FormField),
                ...(updates as Partial<FormField>),
                id: field.id,
            } as FormField;
        }
        if (field.type === 'section') {
            return {
                ...field,
                fields: updateFieldDeep(field.fields, fieldId, updates),
            } as BuilderSectionField;
        }
        return field;
    });
};

const removeFieldDeep = (fields: FormField[], fieldId: string): FormField[] => {
    const filtered = fields.filter((field) => field.id !== fieldId);
    return filtered.map((field) =>
        field.type === 'section'
            ? ({...field, fields: removeFieldDeep(field.fields, fieldId)} as BuilderSectionField)
            : field,
    );
};

export const collectNames = (fields: FormField[], acc: Set<string> = new Set()): Set<string> => {
    fields.forEach((field) => {
        if (field.type === 'section') {
            collectNames(field.fields, acc);
        } else if (field.type !== 'text') {
            acc.add(field.name);
        }
    });
    return acc;
};

const extractBaseName = (name: string): string => {
    const m = name.match(/^(.+?)_copy(?:_\d+)?$/);
    return m ? m[1] : name;
};

const findUniqueCopyName = (originalName: string, existing: Set<string>): string => {
    const stem = extractBaseName(originalName);
    let candidate = `${stem}_copy`;
    let n = 2;
    while (existing.has(candidate)) {
        candidate = `${stem}_copy_${n}`;
        n += 1;
    }
    return candidate;
};

const cloneFieldWithNewIds = (
    field: FormField,
    generateId: () => string,
    existingNames: Set<string>,
): FormField => {
    const newId = generateId();
    if (field.type === 'section') {
        return {
            ...field,
            id: newId,
            title: field.title ? `${field.title} (copy)` : 'Section (copy)',
            fields: field.fields.map((child) =>
                cloneFieldWithNewIds(child, generateId, existingNames),
            ),
        };
    }
    if (field.type === 'text') {
        return {...field, id: newId};
    }
    const newName = findUniqueCopyName(field.name, existingNames);
    existingNames.add(newName);
    return {...field, id: newId, name: newName};
};

const duplicateFieldDeep = (
    fields: FormField[],
    fieldId: string,
    generateId: () => string,
    existingNames: Set<string>,
): FormField[] | null => {
    const index = fields.findIndex((field) => field.id === fieldId);
    if (index !== -1) {
        const clone = cloneFieldWithNewIds(fields[index], generateId, existingNames);
        const next = [...fields];
        next.splice(index + 1, 0, clone);
        return next;
    }
    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];
        if (field.type === 'section') {
            const result = duplicateFieldDeep(field.fields, fieldId, generateId, existingNames);
            if (result !== null) {
                const next = [...fields];
                next[i] = {...field, fields: result};
                return next;
            }
        }
    }
    return null;
};

const addChildToSectionDeep = (
    fields: FormField[],
    sectionId: string,
    newChild: FormField,
): FormField[] => {
    return fields.map((field) => {
        if (field.id === sectionId && field.type === 'section') {
            return {...field, fields: [...field.fields, newChild]};
        }
        if (field.type === 'section') {
            return {
                ...field,
                fields: addChildToSectionDeep(field.fields, sectionId, newChild),
            };
        }
        return field;
    });
};

const containsId = (field: FormField, id: string): boolean => {
    if (field.id === id) return true;
    if (field.type === 'section') {
        return field.fields.some((f) => containsId(f, id));
    }
    return false;
};

const insertBeforeDeep = (
    fields: FormField[],
    targetId: string,
    arrayMode: boolean,
    makeField: (arrayMode: boolean) => FormField,
): FormField[] | null => {
    const index = fields.findIndex((field) => field.id === targetId);
    if (index !== -1) {
        const newField = makeField(arrayMode);
        const next = [...fields];
        next.splice(index, 0, newField);
        return next;
    }
    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];
        if (field.type === 'section') {
            const childArrayMode = Boolean(field.index);
            const result = insertBeforeDeep(field.fields, targetId, childArrayMode, makeField);
            if (result !== null) {
                const next = [...fields];
                next[i] = {...field, fields: result};
                return next;
            }
        }
    }
    return null;
};

const isArrayModeSection = (fields: FormField[], sectionId: string): boolean => {
    for (const field of fields) {
        if (field.id === sectionId && field.type === 'section') {
            return Boolean(field.index);
        }
        if (field.type === 'section' && isArrayModeSection(field.fields, sectionId)) {
            return true;
        }
    }
    return false;
};

export const ARRAY_ITEM_PREFIX = 'items[{{index}}].';

export const prefixNameForArrayMode = (name: string): string =>
    name.includes('{{index}}') ? name : `${ARRAY_ITEM_PREFIX}${name}`;

export const stripArrayModePrefix = (name: string): string =>
    name.startsWith(ARRAY_ITEM_PREFIX) ? name.slice(ARRAY_ITEM_PREFIX.length) : name;

export const transformChildNames = (
    fields: FormField[],
    transform: (name: string) => string,
): FormField[] =>
    fields.map((field) => {
        if (field.type === 'section' || field.type === 'text') {
            return field;
        }
        return {...field, name: transform(field.name)};
    });

export const buildGroupsMap = (fields: FormField[]): Record<string, FormField[]> => {
    const groups: Record<string, FormField[]> = {root: fields};
    const walk = (fs: FormField[]) => {
        fs.forEach((field) => {
            if (field.type === 'section') {
                groups[`section:${field.id}`] = field.fields;
                walk(field.fields);
            }
        });
    };
    walk(fields);
    return groups;
};

export const applyGroupsMap = (groups: Record<string, FormField[]>): FormField[] => {
    const transform = (fields: FormField[]): FormField[] =>
        fields.map((field) => {
            if (field.type === 'section') {
                const childGroup = groups[`section:${field.id}`] ?? field.fields;
                return {...field, fields: transform(childGroup)};
            }
            return field;
        });
    return transform(groups.root ?? []);
};

interface SwapResult {
    fields: FormField[];
    handled: boolean;
}

const swapInListDeep = (fields: FormField[], fieldId: string, delta: -1 | 1): SwapResult => {
    const index = fields.findIndex((field) => field.id === fieldId);
    if (index !== -1) {
        const target = index + delta;
        if (target < 0 || target >= fields.length) {
            return {fields, handled: true};
        }
        const next = [...fields];
        [next[index], next[target]] = [next[target], next[index]];
        return {fields: next, handled: true};
    }

    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];
        if (field.type === 'section') {
            const result = swapInListDeep(field.fields, fieldId, delta);
            if (result.handled) {
                const next = [...fields];
                next[i] = {...field, fields: result.fields};
                return {fields: next, handled: true};
            }
        }
    }

    return {fields, handled: false};
};

export const useFormFields = ({initialFields, onChange}: UseFormFieldsProps) => {
    const [formFields, setFormFields] = React.useState<FormField[]>(initialFields);
    const [selectedFieldId, setSelectedFieldId] = React.useState<string | null>(null);
    const idCounter = React.useRef<number>(maxIdNumericSuffix(initialFields) + 1);

    const generateId = React.useCallback(() => {
        const id = `fb2_${idCounter.current}`;
        idCounter.current += 1;
        return id;
    }, []);

    const generateName = React.useCallback(() => `field_${idCounter.current}`, []);

    const commit = React.useCallback(
        (next: FormField[]) => {
            setFormFields(next);
            onChange?.(next);
        },
        [onChange],
    );

    const addField = React.useCallback(
        (type: BuilderFieldType) => {
            const id = generateId();
            const name = generateName();
            const newField = createDefaultField(type, name, id);
            commit([...formFields, newField]);
        },
        [commit, formFields, generateId, generateName],
    );

    const addFieldToSection = React.useCallback(
        (sectionId: string, type: BuilderFieldType) => {
            const id = generateId();
            const baseName = generateName();
            const arrayMode = isArrayModeSection(formFields, sectionId);
            const name = arrayMode ? prefixNameForArrayMode(baseName) : baseName;
            const newChild = createDefaultField(type, name, id);
            commit(addChildToSectionDeep(formFields, sectionId, newChild));
        },
        [commit, formFields, generateId, generateName],
    );

    const insertFieldBefore = React.useCallback(
        (targetId: string, type: BuilderFieldType) => {
            const makeField = (arrayMode: boolean): FormField => {
                const id = generateId();
                const baseName = generateName();
                const name = arrayMode ? prefixNameForArrayMode(baseName) : baseName;
                return createDefaultField(type, name, id);
            };
            const result = insertBeforeDeep(formFields, targetId, false, makeField);
            if (result !== null) {
                commit(result);
            } else {
                const fallback = makeField(false);
                commit([...formFields, fallback]);
            }
        },
        [commit, formFields, generateId, generateName],
    );

    const removeField = React.useCallback(
        (fieldId: string) => {
            commit(removeFieldDeep(formFields, fieldId));
        },
        [commit, formFields],
    );

    const moveFieldToSection = React.useCallback(
        (fieldId: string, targetSectionId: string) => {
            if (fieldId === targetSectionId) return;

            const sourceField = findFieldById(formFields, fieldId);
            if (!sourceField) return;

            const targetField = findFieldById(formFields, targetSectionId);
            if (!targetField || targetField.type !== 'section') {
                return;
            }

            if (sourceField.type === 'section' && containsId(sourceField, targetSectionId)) {
                return;
            }

            const withoutField = removeFieldDeep(formFields, fieldId);
            const targetIsArray = isArrayModeSection(withoutField, targetSectionId);

            let movedField = sourceField;
            if (sourceField.type !== 'section' && sourceField.type !== 'text') {
                const currentHasIndex = sourceField.name.includes('{{index}}');
                if (targetIsArray && !currentHasIndex) {
                    movedField = {
                        ...sourceField,
                        name: prefixNameForArrayMode(sourceField.name),
                    };
                } else if (!targetIsArray && currentHasIndex) {
                    movedField = {
                        ...sourceField,
                        name: stripArrayModePrefix(sourceField.name),
                    };
                }
            }

            const result = addChildToSectionDeep(withoutField, targetSectionId, movedField);
            commit(result);
        },
        [commit, formFields],
    );

    const duplicateField = React.useCallback(
        (fieldId: string) => {
            const existingNames = collectNames(formFields);
            const result = duplicateFieldDeep(formFields, fieldId, generateId, existingNames);
            if (result !== null) {
                commit(result);
            }
        },
        [commit, formFields, generateId],
    );

    const updateField = React.useCallback(
        (fieldId: string, updates: FieldUpdate) => {
            commit(updateFieldDeep(formFields, fieldId, updates));
        },
        [commit, formFields],
    );

    const moveFieldUp = React.useCallback(
        (fieldId: string) => {
            const result = swapInListDeep(formFields, fieldId, -1);
            if (result.handled) {
                commit(result.fields);
            }
        },
        [commit, formFields],
    );

    const moveFieldDown = React.useCallback(
        (fieldId: string) => {
            const result = swapInListDeep(formFields, fieldId, 1);
            if (result.handled) {
                commit(result.fields);
            }
        },
        [commit, formFields],
    );

    const setAllFields = React.useCallback(
        (next: FormField[]) => {
            commit(next);
        },
        [commit],
    );

    const resetForm = React.useCallback(() => {
        commit([]);
        setSelectedFieldId(null);
    }, [commit]);

    const selectField = React.useCallback((fieldId: string | null) => {
        setSelectedFieldId(fieldId);
    }, []);

    return {
        formFields,
        selectedFieldId,
        addField,
        addFieldToSection,
        insertFieldBefore,
        moveFieldToSection,
        removeField,
        duplicateField,
        updateField,
        moveFieldUp,
        moveFieldDown,
        setAllFields,
        resetForm,
        selectField,
    };
};

function maxIdNumericSuffix(fields: FormField[]): number {
    let max = 0;
    const walk = (list: FormField[]) => {
        for (const field of list) {
            const match = /^fb2_(\d+)$/.exec(field.id);
            if (match) {
                const n = parseInt(match[1]!, 10);
                if (n > max) max = n;
            }
            if (field.type === 'section') {
                walk(field.fields);
            }
        }
    };
    walk(fields);
    return max;
}
