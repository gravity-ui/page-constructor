import type {JSONSchemaType} from 'ajv';

import type {Fields, SegmentedRadioGroupField, SectionField, When} from '../types';

export type GenerateFormFieldsFromAjvSchemaOptions = {
    arrayIndexPlaceholder?: (arrayDepth: number) => string;
    wrapInRootSection?: boolean;
    rootSectionTitle?: string;
    generalSectionTitle?: string;
    skipProperties?: string[];
};

type ResolvedOptions = Required<
    Pick<GenerateFormFieldsFromAjvSchemaOptions, 'arrayIndexPlaceholder' | 'skipProperties'>
> &
    Pick<
        GenerateFormFieldsFromAjvSchemaOptions,
        'wrapInRootSection' | 'rootSectionTitle' | 'generalSectionTitle'
    >;

const defaultArrayPlaceholder = (arrayDepth: number): string => `index${arrayDepth + 1}`;

const DEFAULT_SKIP_PROPERTIES = ['when'];

function resolveOptions(options?: GenerateFormFieldsFromAjvSchemaOptions): ResolvedOptions {
    return {
        arrayIndexPlaceholder: options?.arrayIndexPlaceholder ?? defaultArrayPlaceholder,
        skipProperties: options?.skipProperties ?? DEFAULT_SKIP_PROPERTIES,
        wrapInRootSection: options?.wrapInRootSection,
        rootSectionTitle: options?.rootSectionTitle,
        generalSectionTitle: options?.generalSectionTitle,
    };
}

// ─── Title helpers ────────────────────────────────────────────────────────────

function formatKeyAsTitle(key: string): string {
    if (!key) return '';
    // strip leading underscores/dashes, then split on camelCase and separators
    const clean = key.replace(/^[_-]+/, '');
    return clean
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase());
}

function resolveTitle(schema: JSONSchemaType<{}>, key: string): string {
    const s = schema as Record<string, unknown>;
    if (typeof s['title'] === 'string' && s['title']) return s['title'];
    if (typeof s['optionName'] === 'string' && s['optionName']) return s['optionName'];
    return formatKeyAsTitle(key);
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

const joinPath = (base: string, key: string): string => {
    if (!key) return base;
    return base ? `${base}.${key}` : key;
};

function makeArrayIndexPlaceholder(
    pathPrefix: string,
    fieldName: string,
    arrayDepth: number,
    placeholder: (d: number) => string,
): string {
    const base = placeholder(arrayDepth);
    const fullPath = joinPath(pathPrefix, fieldName);
    const safeSuffix = fullPath.replace(/[^\w]/g, '_');
    return safeSuffix ? `${base}_${safeSuffix}` : base;
}

function oneOfDiscriminatorKey(pathPrefix: string, fieldName: string): string {
    const safeName = fieldName.replace(/[^\w]/g, '_');
    return joinPath(pathPrefix, `__oneOf_${safeName}`);
}

// ─── When helpers ─────────────────────────────────────────────────────────────

function sanitizeWhen(when: When | undefined): When | undefined {
    if (!when?.length) return undefined;

    const result: When = [];
    for (const token of when) {
        if (token.field) {
            if (
                (token.operator === '===' || token.operator === '!==') &&
                token.value !== undefined
            ) {
                result.push(token);
            }
            continue;
        }
        if ((token.operator === '&&' || token.operator === '||') && result.length > 0) {
            result.push(token);
        }
    }

    while (result.length > 0 && !result[result.length - 1]!.field) {
        result.pop();
    }

    return result.length > 0 ? result : undefined;
}

function mergeWhen(existing: When | undefined, extra: When | undefined): When | undefined {
    const left = sanitizeWhen(existing);
    const right = sanitizeWhen(extra);
    if (!right?.length) return left;
    if (!left?.length) return right;
    return sanitizeWhen([...left, {operator: '&&' as const}, ...right]);
}

function parseShowIfToWhen(showIf?: string): When | undefined {
    if (!showIf) return undefined;
    const parts = showIf.trim().split(/\s+/);
    if (parts.length !== 3) return undefined;
    const [field, op, raw] = parts;
    if (op !== '===' && op !== '!==') return undefined;
    let value: string | boolean = raw;
    if (raw === 'true') value = true;
    else if (raw === 'false') value = false;
    else if (
        (raw.startsWith('"') && raw.endsWith('"')) ||
        (raw.startsWith("'") && raw.endsWith("'"))
    ) {
        value = raw.slice(1, -1);
    }
    return [{field, operator: op, value}];
}

function withWhen(field: Fields[number], when: When | undefined): Fields[number] {
    if (!when?.length) return field;
    return {...field, when} as Fields[number];
}

function applyBranchWhenToFields(fields: Fields, branchWhen: When | undefined): Fields {
    if (!branchWhen?.length) return fields;
    return fields.map(
        (field) =>
            ({
                ...field,
                when: mergeWhen((field as {when?: When}).when, branchWhen),
            }) as Fields[number],
    );
}

// ─── Sort helpers ─────────────────────────────────────────────────────────────

function sortGeneratedFieldsSectionsLast(fields: Fields): Fields {
    const withSortedChildren = fields.map((field) => {
        if (field.type === 'section') {
            return {...field, fields: sortGeneratedFieldsSectionsLast(field.fields)};
        }
        return field;
    });
    const nonSection: Fields = [];
    const sections: Fields = [];
    for (const field of withSortedChildren) {
        if (field.type === 'section') sections.push(field);
        else nonSection.push(field);
    }
    return [...nonSection, ...sections];
}

// ─── Schema type helpers ──────────────────────────────────────────────────────

function isTextArea(schema: JSONSchemaType<{}>): boolean {
    const s = schema as Record<string, unknown>;
    return s['inputType'] === 'textarea' || s['contentType'] === 'yfm';
}

// ─── Converters ───────────────────────────────────────────────────────────────

function convertScalar(
    fieldPath: string,
    schema: JSONSchemaType<{}>,
    when: When | undefined,
): Fields {
    const s = schema as Record<string, unknown>;
    const title = resolveTitle(schema, fieldPath.split('.').pop() ?? fieldPath);

    const type = schema.type as string | undefined;
    const enumValues = (s['enum'] as string[] | undefined) ?? undefined;

    if (enumValues?.length || (!type && enumValues)) {
        return [
            withWhen(
                {
                    type: 'select' as const,
                    name: fieldPath,
                    title,
                    options: enumValues!.map((e) => ({value: String(e), content: String(e)})),
                },
                when,
            ),
        ];
    }

    if (type === 'string') {
        if (isTextArea(schema)) {
            return [withWhen({type: 'textArea' as const, name: fieldPath, title}, when)];
        }
        return [withWhen({type: 'textInput' as const, name: fieldPath, title}, when)];
    }

    if (type === 'number' || type === 'integer') {
        return [withWhen({type: 'textInput' as const, name: fieldPath, title}, when)];
    }

    if (type === 'boolean') {
        return [withWhen({type: 'switch' as const, name: fieldPath, title}, when)];
    }

    return [];
}

function convertVariantFields(
    variant: JSONSchemaType<{}>,
    parentPath: string,
    arrayDepth: number,
    opts: ResolvedOptions,
): Fields {
    const s = variant as Record<string, unknown>;
    if (variant.type === 'object' && s['properties']) {
        return convertProperties(
            Object.entries(s['properties'] as Record<string, JSONSchemaType<{}>>),
            parentPath,
            arrayDepth,
            opts,
        );
    }
    return convertScalar(parentPath, variant, undefined);
}

function convertOneOrAnyOf(
    key: string,
    variants: JSONSchemaType<{}>[],
    fieldPath: string,
    title: string,
    when: When | undefined,
    pathPrefix: string,
    arrayDepth: number,
    opts: ResolvedOptions,
): Fields {
    const metaKey = oneOfDiscriminatorKey(pathPrefix, key);

    const variantOptions = variants.map((v, i) => {
        const s = v as Record<string, unknown>;
        const value =
            (s['optionName'] as string | undefined) ??
            (s['type'] as string | undefined) ??
            String(i);
        const content =
            (s['optionName'] as string | undefined) ??
            (s['title'] as string | undefined) ??
            (s['type'] as string | undefined) ??
            String(i);
        return {value, content};
    });

    const discriminator: SegmentedRadioGroupField = {
        type: 'segmentedRadioGroup',
        name: metaKey,
        title,
        options: variantOptions,
    };

    const branchFields = variants.flatMap((variant, i) => {
        const branchWhen: When = [
            {field: metaKey, operator: '===', value: variantOptions[i].value},
        ];
        const fields = convertVariantFields(variant, fieldPath, arrayDepth, opts);
        return applyBranchWhenToFields(fields, branchWhen);
    });

    const section: SectionField = {
        type: 'section',
        title,
        fields: [discriminator, ...branchFields],
    };

    return [withWhen(section, when)];
}

function convertArray(
    key: string,
    schema: JSONSchemaType<{}>,
    fieldPath: string,
    title: string,
    when: When | undefined,
    pathPrefix: string,
    arrayDepth: number,
    opts: ResolvedOptions,
): Fields {
    const items = (schema as Record<string, unknown>)['items'] as JSONSchemaType<{}> | undefined;
    if (!items) return [];

    const ph = makeArrayIndexPlaceholder(pathPrefix, key, arrayDepth, opts.arrayIndexPlaceholder);
    const itemPath = `${fieldPath}[{{${ph}}}]`;

    const itemsType = (items as Record<string, unknown>)['type'] as string | undefined;
    const itemsEnum = (items as Record<string, unknown>)['enum'] as unknown[] | undefined;

    let innerFields: Fields;
    if (itemsType === 'string' || itemsEnum) {
        innerFields = [{type: 'textInput', name: itemPath, title}];
    } else if (itemsType === 'object') {
        const itemProps = (items as Record<string, unknown>)['properties'] as
            | Record<string, JSONSchemaType<{}>>
            | undefined;
        innerFields = itemProps
            ? convertProperties(Object.entries(itemProps), itemPath, arrayDepth + 1, opts)
            : [];
    } else {
        // items with oneOf/anyOf or other complex types — delegate to convertProperty
        innerFields = convertProperty('', items, itemPath, arrayDepth + 1, opts);
    }

    const section: SectionField = {
        type: 'section',
        index: ph,
        withAddButton: true,
        title,
        itemTitle: `${title} {{${ph}}}`,
        fields: innerFields,
    };

    return [withWhen(section, when)];
}

function convertProperty(
    key: string,
    schema: JSONSchemaType<{}>,
    pathPrefix: string,
    arrayDepth: number,
    opts: ResolvedOptions,
): Fields {
    const s = schema as Record<string, unknown>;
    const fieldPath = joinPath(pathPrefix, key);
    const title = resolveTitle(schema, key);

    const showIf = (s['showIf'] as string | undefined) ?? undefined;
    const when = parseShowIfToWhen(showIf);

    const schemaEnum = s['enum'] as string[] | undefined;
    const schemaType = schema.type as string | undefined;

    // oneOf / anyOf
    if (s['oneOf']) {
        return convertOneOrAnyOf(
            key,
            s['oneOf'] as JSONSchemaType<{}>[],
            fieldPath,
            title,
            when,
            pathPrefix,
            arrayDepth,
            opts,
        );
    }
    if (s['anyOf']) {
        return convertOneOrAnyOf(
            key,
            s['anyOf'] as JSONSchemaType<{}>[],
            fieldPath,
            title,
            when,
            pathPrefix,
            arrayDepth,
            opts,
        );
    }

    // enum without explicit type
    if (schemaEnum && !schemaType) {
        return [
            withWhen(
                {
                    type: 'select' as const,
                    name: fieldPath,
                    title,
                    options: schemaEnum.map((e) => ({value: String(e), content: String(e)})),
                },
                when,
            ),
        ];
    }

    switch (schemaType) {
        case 'string': {
            if (schemaEnum) {
                return [
                    withWhen(
                        {
                            type: 'select' as const,
                            name: fieldPath,
                            title,
                            options: schemaEnum.map((e) => ({
                                value: String(e),
                                content: String(e),
                            })),
                        },
                        when,
                    ),
                ];
            }
            if (isTextArea(schema)) {
                return [withWhen({type: 'textArea' as const, name: fieldPath, title}, when)];
            }
            return [withWhen({type: 'textInput' as const, name: fieldPath, title}, when)];
        }

        case 'number':
        case 'integer':
            return [withWhen({type: 'textInput' as const, name: fieldPath, title}, when)];

        case 'boolean':
            return [withWhen({type: 'switch' as const, name: fieldPath, title}, when)];

        case 'object': {
            const props = s['properties'] as Record<string, JSONSchemaType<{}>> | undefined;
            if (!props) return [];
            return [
                withWhen(
                    {
                        type: 'section' as const,
                        title,
                        fields: convertProperties(
                            Object.entries(props),
                            fieldPath,
                            arrayDepth,
                            opts,
                        ),
                    },
                    when,
                ),
            ];
        }

        case 'array':
            return convertArray(key, schema, fieldPath, title, when, pathPrefix, arrayDepth, opts);

        default:
            return [];
    }
}

function convertProperties(
    entries: [string, JSONSchemaType<{}>][],
    pathPrefix: string,
    arrayDepth: number,
    opts: ResolvedOptions,
): Fields {
    return entries
        .filter(([key]) => !opts.skipProperties.includes(key))
        .flatMap(([key, schema]) => convertProperty(key, schema, pathPrefix, arrayDepth, opts));
}

export function generateFormFieldsFromAjvSchema(
    schema: JSONSchemaType<{}>,
    options?: GenerateFormFieldsFromAjvSchemaOptions,
): Fields {
    const opts = resolveOptions(options);
    const props = (schema as Record<string, unknown>)['properties'] as
        | Record<string, JSONSchemaType<{}>>
        | undefined;

    if (!props) return [];

    const inner = sortGeneratedFieldsSectionsLast(
        convertProperties(Object.entries(props), '', 0, opts),
    );

    if (opts.wrapInRootSection) {
        return [
            {
                type: 'section',
                title: opts.rootSectionTitle ?? 'Settings',
                fields: inner,
            },
        ];
    }

    const nonSections = inner.filter((f) => f.type !== 'section');
    const sections = inner.filter((f) => f.type === 'section');

    if (nonSections.length === 0) return sections;

    const generalSection: SectionField = {
        type: 'section',
        title: opts.generalSectionTitle ?? 'General',
        fields: nonSections,
    };

    return [generalSection, ...sections];
}
