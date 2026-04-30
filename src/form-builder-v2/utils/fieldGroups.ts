import {FormField} from '../types';

import {walkFields} from './treeWalk';

export const buildGroupsMap = (fields: FormField[]): Record<string, FormField[]> => {
    const groups: Record<string, FormField[]> = {root: fields};
    walkFields(fields, (field) => {
        if (field.type === 'section') {
            groups[`section:${field.id}`] = field.fields;
        }
    });
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
