import {BuilderSectionField, FormField} from '../types';

export const walkFields = (fields: FormField[], visit: (field: FormField) => void): void => {
    for (const field of fields) {
        visit(field);
        if (field.type === 'section') {
            walkFields(field.fields, visit);
        }
    }
};

export const findField = (
    fields: FormField[],
    predicate: (field: FormField) => boolean,
): FormField | null => {
    for (const field of fields) {
        if (predicate(field)) return field;
        if (field.type === 'section') {
            const nested = findField(field.fields, predicate);
            if (nested) return nested;
        }
    }
    return null;
};

export const transformAtId = (
    fields: FormField[],
    id: string,
    handler: (
        siblings: FormField[],
        index: number,
        parent: BuilderSectionField | null,
    ) => FormField[],
    parent: BuilderSectionField | null = null,
): FormField[] | null => {
    const index = fields.findIndex((field) => field.id === id);
    if (index !== -1) {
        return handler(fields, index, parent);
    }
    for (let i = 0; i < fields.length; i += 1) {
        const field = fields[i];
        if (field.type === 'section') {
            const result = transformAtId(field.fields, id, handler, field);
            if (result !== null) {
                const next = [...fields];
                next[i] = {...field, fields: result};
                return next;
            }
        }
    }
    return null;
};
