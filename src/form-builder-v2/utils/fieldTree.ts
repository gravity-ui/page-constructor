import type {FormField} from '../types';

import {findField} from './treeWalk';

export const findFieldById = (fields: FormField[], id: string): FormField | null =>
    findField(fields, (field) => field.id === id);
