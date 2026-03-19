import {get} from 'lodash';

type NamePathSegment =
    | {type: 'fixed'; prop: string; index: number}
    | {type: 'placeholder'; prop: string; placeholder: string};

const getSegmentsFromTemplate = (templateName: string): NamePathSegment[] => {
    const re = /(\w+)\[(?:\{\{(\w+)\}\}|(\d+))\]/g;
    const segments: NamePathSegment[] = [];
    let match: RegExpExecArray | null;

    while ((match = re.exec(templateName)) !== null) {
        const prop = match[1]!;
        const placeholder = match[2];
        const fixedIndex = match[3];

        if (placeholder !== undefined) {
            segments.push({type: 'placeholder', prop, placeholder});
        } else if (fixedIndex !== undefined) {
            const index = parseInt(fixedIndex, 10);
            if (!Number.isNaN(index)) {
                segments.push({type: 'fixed', prop, index});
            }
        }
    }

    return segments;
};

export const getArrayPathForPlaceholder = (
    templateName: string,
    placeholder: string,
): string | undefined => {
    const segments = getSegmentsFromTemplate(templateName);
    const placeholderIdx = segments.findIndex(
        (s) => s.type === 'placeholder' && s.placeholder === placeholder,
    );
    if (placeholderIdx < 0) {
        return undefined;
    }

    for (let i = 0; i < placeholderIdx; i++) {
        if (segments[i]!.type !== 'fixed') {
            return undefined;
        }
    }

    const prefixParts: string[] = [];
    for (let i = 0; i < placeholderIdx; i++) {
        const s = segments[i] as {type: 'fixed'; prop: string; index: number};
        prefixParts.push(`${s.prop}[${s.index}]`);
    }

    const at = segments[placeholderIdx] as {type: 'placeholder'; prop: string};
    const prefix = prefixParts.join('.');
    return prefix ? `${prefix}.${at.prop}` : at.prop;
};

const getResolvedBrackets = (resolvedName: string): Array<{prop: string; index: number}> =>
    [...resolvedName.matchAll(/(\w+)\[(\d+)\]/g)].map((m) => ({
        prop: m[1]!,
        index: parseInt(m[2]!, 10),
    }));

export const findNameWithPlaceholder = (
    fields: unknown,
    placeholder: string,
): string | undefined => {
    const needle = `{{${placeholder}}}`;
    const stack: unknown[] = Array.isArray(fields) ? [...fields] : [fields];

    while (stack.length > 0) {
        const current = stack.pop();
        if (current === undefined || current === null) {
            continue;
        }

        if (Array.isArray(current)) {
            stack.push(...current);
            continue;
        }

        if (typeof current !== 'object') {
            continue;
        }

        const name = (current as {name?: unknown}).name;
        if (typeof name === 'string' && name.includes(needle)) {
            return name;
        }

        stack.push(...Object.values(current));
    }

    return undefined;
};

export const getSpliceTarget = (
    templateName: string,
    resolvedName: string,
    placeholder: string,
):
    | {
          arrayPath: string;
          itemIndex: number;
      }
    | undefined => {
    const templateSegments = getSegmentsFromTemplate(templateName);
    const placeholderIdx = templateSegments.findIndex(
        (s) => s.type === 'placeholder' && s.placeholder === placeholder,
    );
    if (placeholderIdx < 0) {
        return undefined;
    }

    const resolved = getResolvedBrackets(resolvedName);
    const at = resolved[placeholderIdx];
    if (!at || Number.isNaN(at.index)) {
        return undefined;
    }

    const prefix: string[] = [];
    for (let i = 0; i < placeholderIdx; i++) {
        const part = resolved[i];
        if (!part) {
            return undefined;
        }
        prefix.push(`${part.prop}[${part.index}]`);
    }

    const arrayPath = prefix.length > 0 ? `${prefix.join('.')}.${at.prop}` : at.prop;

    return {
        arrayPath,
        itemIndex: at.index,
    };
};

export const findAllNames = (fields: unknown): string[] => {
    const names: string[] = [];
    const stack = [fields];

    while (stack.length > 0) {
        const current = stack.pop();

        if (Array.isArray(current)) {
            stack.push(...current);
        } else if (current && typeof current === 'object') {
            const n = (current as {name?: unknown}).name;
            if (typeof n === 'string') {
                names.push(n);
            }
            stack.push(...Object.values(current));
        }
    }

    return names;
};


export const getValueByPath = (obj: unknown, path: string, defaultValue?: unknown) => {
    if (path == null || path === '') {
        return defaultValue;
    }
    return get(obj, path, defaultValue);
};

const isMeaningfulContentValue = (value: unknown): boolean => {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string') {
        return value.trim() !== '';
    }
    if (typeof value === 'boolean') {
        return true;
    }
    if (typeof value === 'number') {
        return !Number.isNaN(value);
    }
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    if (typeof value === 'object') {
        return Object.keys(value as object).length > 0;
    }
    return true;
};

export const sectionHasContentData = (
    fields: unknown[] | undefined | null,
    content: unknown,
): boolean => {
    if (!fields?.length) {
        return false;
    }

    for (const field of fields) {
        if (!field || typeof field !== 'object') {
            continue;
        }

        const f = field as Record<string, unknown>;
        const type = f.type;

        if (type === 'section') {
            if (sectionHasContentData(f.fields as unknown[] | undefined, content)) {
                return true;
            }
            continue;
        }

        if (type === 'oneTypeGroup') {
            const groupFields = f.fields;
            const placeholder = f.index;
            if (!Array.isArray(groupFields) || typeof placeholder !== 'string') {
                continue;
            }
            const templateName = findNameWithPlaceholder(groupFields, placeholder);
            if (!templateName) {
                continue;
            }
            const arrayPath = getArrayPathForPlaceholder(templateName, placeholder);
            if (!arrayPath) {
                continue;
            }
            const arr = get(content, arrayPath);
            if (Array.isArray(arr) && arr.length > 0) {
                return true;
            }
            continue;
        }

        if (typeof f.name === 'string' && f.name.length > 0) {
            if (isMeaningfulContentValue(get(content, f.name))) {
                return true;
            }
        }
    }

    return false;
};

export type SectionClearOnUpdate = (
    path: string,
    value: unknown,
    options?: {unset?: boolean; removeArrayItemAt?: number},
) => void;

export type SectionScalarReset =
    | {path: string; mode: 'unset'}
    | {path: string; mode: 'set'; value: unknown};


export const collectSectionClearTargets = (
    fields: unknown[] | undefined | null,
): {arrayPaths: string[]; scalarResets: SectionScalarReset[]} => {
    const arrayPaths = new Set<string>();
    const scalarResets: SectionScalarReset[] = [];

    const walk = (list: unknown[] | undefined | null) => {
        if (!list?.length) {
            return;
        }
        for (const field of list) {
            if (!field || typeof field !== 'object') {
                continue;
            }
            const f = field as Record<string, unknown>;
            const type = f.type;

            if (type === 'section') {
                walk(f.fields as unknown[]);
                continue;
            }

            if (type === 'oneTypeGroup') {
                const groupFields = f.fields;
                const placeholder = f.index;
                if (Array.isArray(groupFields) && typeof placeholder === 'string') {
                    const templateName = findNameWithPlaceholder(groupFields, placeholder);
                    if (templateName) {
                        const arrayPath = getArrayPathForPlaceholder(templateName, placeholder);
                        if (arrayPath) {
                            arrayPaths.add(arrayPath);
                        }
                    }
                    walk(groupFields);
                }
                continue;
            }

            if (typeof f.name === 'string' && f.name.length > 0 && !f.name.includes('{{')) {
                if (type === 'segmentedRadioGroup' && Object.hasOwn(f, 'defaultValue')) {
                    scalarResets.push({path: f.name, mode: 'set', value: f.defaultValue});
                } else {
                    scalarResets.push({path: f.name, mode: 'unset'});
                }
            }
        }
    };

    walk(fields);

    return {
        arrayPaths: [...arrayPaths],
        scalarResets,
    };
};

export const clearSectionFormContent = (fields: unknown[] | undefined | null, onUpdate: SectionClearOnUpdate) => {
    const {arrayPaths, scalarResets} = collectSectionClearTargets(fields);
    const arraySorted = [...arrayPaths].sort((a, b) => b.length - a.length);
    for (const path of arraySorted) {
        onUpdate(path, []);
    }
    for (const item of scalarResets) {
        if (item.mode === 'set') {
            onUpdate(item.path, item.value as never);
        } else {
            onUpdate(item.path, undefined, {unset: true});
        }
    }
};
