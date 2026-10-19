import {toPath} from 'lodash';

import type {FormField} from '../types';

export interface FieldPath {
    field: FormField & {name: string};
    parts: string[];
    placeholders: Set<string>;
}

export const getFieldPaths = (fields: FormField[]): FieldPath[] => {
    const result: FieldPath[] = [];
    const visit = (items: FormField[], indices: string[]) => {
        for (const field of items) {
            if (field.type === 'section') {
                visit(
                    field.fields,
                    field.index === undefined ? indices : [...indices, `{{${field.index}}}`],
                );
            } else if ('name' in field) {
                const parts = toPath(field.name);
                result.push({
                    field,
                    parts,
                    placeholders: new Set(indices.filter((index) => parts.includes(index))),
                });
            }
        }
    };
    visit(fields, []);
    return result;
};
