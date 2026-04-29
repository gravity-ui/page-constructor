import type {FormField} from '../types';

const VALID_TYPES = new Set([
    'textInput',
    'textArea',
    'select',
    'segmentedRadioGroup',
    'switch',
    'colorInput',
    'text',
    'section',
]);

let importIdCounter = 0;
const newImportedId = () => {
    importIdCounter += 1;
    return `imp_${importIdCounter}`;
};

export type ParseSchemaResult = {ok: true; fields: FormField[]} | {ok: false; error: string};

const validateAndAssignIds = (raw: unknown[], path: string): FormField[] => {
    const seenNames = new Set<string>();
    return raw.map((item, i) => {
        const here = `${path}[${i}]`;
        if (!item || typeof item !== 'object') {
            throw new Error(`${here}: expected object, got ${typeof item}`);
        }
        const obj = item as Record<string, unknown>;
        if (typeof obj.type !== 'string' || !VALID_TYPES.has(obj.type)) {
            throw new Error(`${here}: unknown field type "${String(obj.type)}"`);
        }
        if (typeof obj.name === 'string') {
            if (seenNames.has(obj.name)) {
                throw new Error(`${here}: duplicate name "${obj.name}"`);
            }
            seenNames.add(obj.name);
        }
        if (obj.type === 'section') {
            const nested = Array.isArray(obj.fields)
                ? validateAndAssignIds(obj.fields, `${here}.fields`)
                : [];
            return {...obj, id: newImportedId(), fields: nested} as FormField;
        }
        return {...obj, id: newImportedId()} as FormField;
    });
};

export const parseSchema = (input: string): ParseSchemaResult => {
    const trimmed = input.trim();
    if (!trimmed) {
        return {ok: false, error: 'Schema is empty'};
    }
    let parsed: unknown;
    try {
        parsed = JSON.parse(trimmed);
    } catch (e) {
        return {ok: false, error: `JSON parse error: ${(e as Error).message}`};
    }
    if (!Array.isArray(parsed)) {
        return {ok: false, error: 'Schema must be a JSON array of fields'};
    }
    try {
        const fields = validateAndAssignIds(parsed, '');
        return {ok: true, fields};
    } catch (e) {
        return {ok: false, error: (e as Error).message};
    }
};
