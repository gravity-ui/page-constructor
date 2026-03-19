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

const getResolvedBrackets = (resolvedName: string): Array<{prop: string; index: number}> =>
    [...resolvedName.matchAll(/(\w+)\[(\d+)\]/g)].map((m) => ({
        prop: m[1]!,
        index: parseInt(m[2]!, 10),
    }));

/**
 * Первый `field.name` в дереве конфига, где есть подстрока `{{placeholder}}`
 * (например `index` → `{{index}}`).
 */
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

/**
 * По шаблону `name` и уже подставленному `name` строки формы — lodash-путь к массиву и индекс для splice.
 */
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

export const findAllNames = (fields) => {
    const names = [];
    const stack = [fields];

    while (stack.length > 0) {
        const current = stack.pop();

        if (Array.isArray(current)) {
            stack.push(...current);
        } else if (current && typeof current === 'object') {
            if ('name' in current) {
                names.push(current.name);
            }
            stack.push(...Object.values(current));
        }
    }

    return names;
};
