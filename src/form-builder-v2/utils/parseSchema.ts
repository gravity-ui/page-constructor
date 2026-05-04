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

export type ParseSchemaResult = {ok: true; fields: FormField[]} | {ok: false; error: string};

const TYPES_REQUIRING_NAME = new Set([
    'textInput',
    'textArea',
    'select',
    'segmentedRadioGroup',
    'switch',
    'colorInput',
]);

const TYPES_WITH_OPTIONS = new Set(['select', 'segmentedRadioGroup']);

const validateField = (obj: Record<string, unknown>, here: string): void => {
    const type = obj.type as string;

    if (TYPES_REQUIRING_NAME.has(type) && typeof obj.name !== 'string') {
        throw new Error(`${here}: field of type "${type}" requires "name"`);
    }

    if (TYPES_WITH_OPTIONS.has(type)) {
        if (!Array.isArray(obj.options) || obj.options.length === 0) {
            throw new Error(`${here}: field of type "${type}" requires non-empty "options" array`);
        }
        obj.options.forEach((opt: unknown, i) => {
            if (!opt || typeof opt !== 'object') {
                throw new Error(`${here}.options[${i}]: expected object`);
            }
            const o = opt as Record<string, unknown>;
            if (typeof o.value !== 'string' || typeof o.content !== 'string') {
                throw new Error(`${here}.options[${i}]: "value" and "content" must be strings`);
            }
        });
    }

    if (type === 'text' && typeof obj.text !== 'string') {
        throw new Error(`${here}: field of type "text" requires "text" string`);
    }
};

const validateAndAssignIds = (raw: unknown[], path: string, nextId: () => string): FormField[] => {
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
        validateField(obj, here);
        if (typeof obj.name === 'string') {
            if (seenNames.has(obj.name)) {
                throw new Error(`${here}: duplicate name "${obj.name}"`);
            }
            seenNames.add(obj.name);
        }
        if (obj.type === 'section') {
            const nested = Array.isArray(obj.fields)
                ? validateAndAssignIds(obj.fields, `${here}.fields`, nextId)
                : [];
            return {...obj, id: nextId(), fields: nested} as FormField;
        }
        return {...obj, id: nextId()} as FormField;
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
    let counter = 0;
    const nextId = () => {
        counter += 1;
        return `imp_${counter}`;
    };
    try {
        const fields = validateAndAssignIds(parsed, '', nextId);
        return {ok: true, fields};
    } catch (e) {
        return {ok: false, error: (e as Error).message};
    }
};
