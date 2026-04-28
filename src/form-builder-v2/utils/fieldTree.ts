import type {FormField} from '../types';

export const findFieldById = (fields: FormField[], id: string): FormField | null => {
    for (const field of fields) {
        if (field.id === id) return field;
        if (field.type === 'section') {
            const nested = findFieldById(field.fields, id);
            if (nested) return nested;
        }
    }
    return null;
};
