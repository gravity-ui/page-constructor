import {BuilderSectionField, FieldUpdate, FormField} from '../types';

import {cloneFieldWithNewIds} from './fieldNames';
import {findField, transformAtId} from './treeWalk';

export const updateFieldDeep = (
    fields: FormField[],
    fieldId: string,
    updates: FieldUpdate,
): FormField[] => {
    return fields.map((field) => {
        if (field.id === fieldId) {
            return {
                ...field,
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

export const removeFieldDeep = (fields: FormField[], fieldId: string): FormField[] => {
    const filtered = fields.filter((field) => field.id !== fieldId);
    return filtered.map((field) =>
        field.type === 'section'
            ? ({...field, fields: removeFieldDeep(field.fields, fieldId)} as BuilderSectionField)
            : field,
    );
};

export const addChildToSectionDeep = (
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

export const containsId = (field: FormField, id: string): boolean =>
    findField([field], (f) => f.id === id) !== null;

export const isArrayModeSection = (fields: FormField[], sectionId: string): boolean => {
    const section = findField(fields, (f) => f.id === sectionId);
    return section?.type === 'section' && Boolean(section.index);
};

export const insertAtTargetDeep = (
    fields: FormField[],
    targetId: string,
    offset: 0 | 1,
    makeField: (arrayMode: boolean) => FormField,
): FormField[] | null =>
    transformAtId(fields, targetId, (siblings, index, parent) => {
        const arrayMode = Boolean(parent?.index);
        const newField = makeField(arrayMode);
        return [...siblings.slice(0, index + offset), newField, ...siblings.slice(index + offset)];
    });

export const duplicateFieldDeep = (
    fields: FormField[],
    fieldId: string,
    generateId: () => string,
    existingNames: Set<string>,
): FormField[] | null =>
    transformAtId(fields, fieldId, (siblings, index) => {
        const clone = cloneFieldWithNewIds(siblings[index], generateId, existingNames);
        return [...siblings.slice(0, index + 1), clone, ...siblings.slice(index + 1)];
    });

export interface SwapResult {
    fields: FormField[];
    handled: boolean;
}

export const swapInListDeep = (fields: FormField[], fieldId: string, delta: -1 | 1): SwapResult => {
    let didSwap = false;
    const result = transformAtId(fields, fieldId, (siblings, index) => {
        const target = index + delta;
        if (target < 0 || target >= siblings.length) {
            return siblings;
        }
        const next = [...siblings];
        [next[index], next[target]] = [next[target], next[index]];
        didSwap = true;
        return next;
    });
    return result === null || !didSwap ? {fields, handled: false} : {fields: result, handled: true};
};
