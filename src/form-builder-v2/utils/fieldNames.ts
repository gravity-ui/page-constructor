import {FormField} from '../types';

import {walkFields} from './treeWalk';

export const ARRAY_ITEM_PREFIX = 'items[{{index}}].';

export const prefixNameForArrayMode = (name: string): string =>
    name.includes('{{index}}') ? name : `${ARRAY_ITEM_PREFIX}${name}`;

export const stripArrayModePrefix = (name: string): string =>
    name.startsWith(ARRAY_ITEM_PREFIX) ? name.slice(ARRAY_ITEM_PREFIX.length) : name;

export const collectNames = (fields: FormField[]): Set<string> => {
    const names = new Set<string>();
    walkFields(fields, (field) => {
        if (field.type !== 'section' && field.type !== 'text') {
            names.add(field.name);
        }
    });
    return names;
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

export const cloneFieldWithNewIds = (
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

export const transformChildNames = (
    fields: FormField[],
    transform: (name: string) => string,
): FormField[] =>
    fields.map((field) => {
        if (field.type === 'section') {
            return {...field, fields: transformChildNames(field.fields, transform)};
        }
        if (field.type === 'text') {
            return field;
        }
        return {...field, name: transform(field.name)};
    });

export const maxIdNumericSuffix = (fields: FormField[]): number => {
    let max = 0;
    walkFields(fields, (field) => {
        const match = /^fb2_(\d+)$/.exec(field.id);
        if (match) {
            const n = parseInt(match[1] ?? '0', 10);
            if (n > max) max = n;
        }
    });
    return max;
};
