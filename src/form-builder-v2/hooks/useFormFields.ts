import * as React from 'react';

import {BuilderFieldType, FieldUpdate, FormField} from '../types';
import {createDefaultField} from '../utils/fieldDefaults';
import {
    collectNames,
    maxIdNumericSuffix,
    prefixNameForArrayMode,
    stripArrayModePrefix,
} from '../utils/fieldNames';
import {findFieldById} from '../utils/fieldTree';
import {
    addChildToSectionDeep,
    containsId,
    duplicateFieldDeep,
    insertAtTargetDeep,
    isArrayModeSection,
    removeFieldDeep,
    swapInListDeep,
    updateFieldDeep,
} from '../utils/fieldTreeOps';

interface UseFormFieldsProps {
    initialFields: FormField[];
    onChange?: (fields: FormField[]) => void;
}

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

    const insertFieldRelative = React.useCallback(
        (targetId: string, type: BuilderFieldType, offset: 0 | 1) => {
            const makeField = (arrayMode: boolean): FormField => {
                const id = generateId();
                const baseName = generateName();
                const name = arrayMode ? prefixNameForArrayMode(baseName) : baseName;
                return createDefaultField(type, name, id);
            };
            const result = insertAtTargetDeep(formFields, targetId, offset, makeField);
            if (result === null) {
                const fallback = makeField(false);
                commit([...formFields, fallback]);
                return;
            }
            commit(result);
        },
        [commit, formFields, generateId, generateName],
    );

    const insertFieldBefore = React.useCallback(
        (targetId: string, type: BuilderFieldType) => insertFieldRelative(targetId, type, 0),
        [insertFieldRelative],
    );

    const insertFieldAfter = React.useCallback(
        (targetId: string, type: BuilderFieldType) => insertFieldRelative(targetId, type, 1),
        [insertFieldRelative],
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
            idCounter.current = Math.max(idCounter.current, maxIdNumericSuffix(next) + 1);
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
        insertFieldAfter,
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
