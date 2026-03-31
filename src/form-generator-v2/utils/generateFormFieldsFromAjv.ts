import type {JSONSchemaType} from 'ajv';

import type {
    AnyOfInput,
    ArrayObjectInput,
    ArrayTextInput,
    ConfigInput,
    ObjectInput,
    OneOfInput,
} from '../../form-generator/types';
import {generateFromAJV} from '../../utils/form-generator';
import type {Fields, When} from '../types';

export type GenerateFormFieldsFromAjvSchemaOptions = {
    arrayIndexPlaceholder?: (arrayDepth: number) => string;
    wrapInRootSection?: boolean;
    rootSectionTitle?: string;
};

const defaultArrayPlaceholder = (arrayDepth: number): string => `index${arrayDepth + 1}`;

const joinPath = (base: string, key: string): string => {
    if (!key) {
        return base;
    }
    return base ? `${base}.${key}` : key;
};

const isArrayObject = (input: ConfigInput): input is ArrayObjectInput =>
    input.type === 'array' && input.arrayType === 'object';

const isArrayText = (input: ConfigInput): input is ArrayTextInput =>
    input.type === 'array' && input.arrayType === 'text';

const makeArrayIndexPlaceholder = (
    pathPrefix: string,
    fieldName: string,
    arrayDepth: number,
    placeholder: (d: number) => string,
): string => {
    const base = placeholder(arrayDepth);
    const fullPath = joinPath(pathPrefix, fieldName);
    const safeSuffix = fullPath.replace(/[^\w]/g, '_');
    return safeSuffix ? `${base}_${safeSuffix}` : base;
};

function sanitizeWhen(when: When | undefined): When | undefined {
    if (!when?.length) {
        return undefined;
    }

    const result: When = [];
    for (const token of when) {
        // Keep only fully-defined comparisons: `field` + comparison operator + `value`.
        if (token.field) {
            if (
                (token.operator === '===' || token.operator === '!==') &&
                token.value !== undefined
            ) {
                result.push(token);
            }
            continue;
        }

        // Keep logical operators only when they connect two valid conditions.
        if ((token.operator === '&&' || token.operator === '||') && result.length > 0) {
            result.push(token);
        }
    }

    // Remove dangling operator at the end, if any.
    while (result.length > 0 && !result[result.length - 1]!.field) {
        result.pop();
    }

    return result.length > 0 ? result : undefined;
}

function mergeWhen(existing: When | undefined, extra: When | undefined): When | undefined {
    const left = sanitizeWhen(existing);
    const right = sanitizeWhen(extra);

    if (!right?.length) {
        return left;
    }
    if (!left?.length) {
        return right;
    }

    return sanitizeWhen([...left, {operator: '&&' as const}, ...right]);
}

function parseShowIfToWhen(showIf?: string): When | undefined {
    if (!showIf) {
        return undefined;
    }
    const parts = showIf.trim().split(/\s+/);
    if (parts.length !== 3) {
        return undefined;
    }
    const [field, op, raw] = parts;
    if (op !== '===' && op !== '!==') {
        return undefined;
    }
    let value: string | boolean = raw;
    if (raw === 'true') {
        value = true;
    } else if (raw === 'false') {
        value = false;
    } else if (
        (raw.startsWith('"') && raw.endsWith('"')) ||
        (raw.startsWith("'") && raw.endsWith("'"))
    ) {
        value = raw.slice(1, -1);
    }
    return [{field, operator: op, value}];
}

function attachShowIf<T extends Record<string, unknown>>(field: T, input: ConfigInput): T {
    const fromShowIf = parseShowIfToWhen(input.showIf);
    if (!fromShowIf?.length) {
        return field;
    }
    const existing = (field as {when?: When}).when;
    return {...field, when: mergeWhen(existing, fromShowIf)} as T;
}

/** Same `when` as the former per-branch section had (discriminator only; parent `showIf` stays on outer section). */
function branchWhenForOption(metaKey: string, optValue: string, optionIndex: number): When {
    if (optionIndex === 0) {
        return [{field: metaKey, operator: '===', value: String(optValue)}];
    }
    return [{field: metaKey, operator: '===', value: String(optValue)}];
}

function applyBranchWhenToFields(fields: Fields, branchWhen: When | undefined): Fields {
    if (!branchWhen?.length) {
        return fields;
    }
    return fields.map((field) => {
        if (field.type === 'section' && 'fields' in field) {
            return {
                ...field,
                when: mergeWhen(field.when, branchWhen),
                fields: applyBranchWhenToFields(field.fields, branchWhen),
            };
        }
        if (field.type === 'oneTypeGroup' && 'fields' in field) {
            return {
                ...field,
                when: mergeWhen(field.when, branchWhen),
                fields: applyBranchWhenToFields(field.fields, branchWhen),
            };
        }
        return {
            ...field,
            when: mergeWhen(field.when, branchWhen),
        };
    });
}

function oneOfDiscriminatorKey(pathPrefix: string, fieldName: string): string {
    const safeName = fieldName.replace(/\./g, '_');
    return joinPath(pathPrefix, `__oneOf_${safeName}`);
}

/** AJV-generated forms only: `section` siblings go after other field types at every nesting level. */
function sortGeneratedFieldsSectionsLast(fields: Fields): Fields {
    const withSortedChildren = fields.map((field) => {
        if (field.type === 'section') {
            return {
                ...field,
                fields: sortGeneratedFieldsSectionsLast(field.fields),
            };
        }
        if (field.type === 'oneTypeGroup') {
            return {
                ...field,
                fields: sortGeneratedFieldsSectionsLast(field.fields),
            };
        }
        return field;
    });

    const nonSection: Fields = [];
    const sectionsOnly: Fields = [];
    for (const field of withSortedChildren) {
        if (field.type === 'section') {
            sectionsOnly.push(field);
        } else {
            nonSection.push(field);
        }
    }
    return [...nonSection, ...sectionsOnly];
}

function convertInputs(
    inputs: ConfigInput[],
    pathPrefix: string,
    arrayDepth: number,
    placeholder: (d: number) => string,
): Fields {
    return inputs.flatMap((input) => convertOne(input, pathPrefix, arrayDepth, placeholder));
}

function convertOne(
    input: ConfigInput,
    pathPrefix: string,
    arrayDepth: number,
    placeholder: (d: number) => string,
): Fields {
    const name = joinPath(pathPrefix, input.name);

    switch (input.type) {
        case 'text':
            return [attachShowIf({type: 'textInput', name, title: input.title}, input)];
        case 'textarea':
            return [attachShowIf({type: 'textArea', name, title: input.title}, input)];
        case 'number':
            return [attachShowIf({type: 'textInput', name, title: input.title}, input)];
        case 'select':
            return [
                attachShowIf(
                    {
                        type: 'select',
                        name,
                        title: input.title,
                        options: input.enum.map((e) => ({
                            value: e.value,
                            content: e.content ?? e.value,
                        })),
                    },
                    input,
                ),
            ];
        case 'boolean': {
            const fields: Fields = [
                attachShowIf({type: 'switch', name, title: input.title}, input),
            ];
            const nested = (input as {properties?: ConfigInput[]}).properties;
            if (Array.isArray(nested) && nested.length) {
                fields.push(...convertInputs(nested, name, arrayDepth, placeholder));
            }
            return fields;
        }
        case 'object': {
            const obj = input as ObjectInput;
            return [
                attachShowIf(
                    {
                        type: 'section',
                        title: obj.title,
                        fields: convertInputs(obj.properties, name, arrayDepth, placeholder),
                    },
                    input,
                ),
            ];
        }
        case 'array': {
            const ph = makeArrayIndexPlaceholder(pathPrefix, input.name, arrayDepth, placeholder);
            const itemPath = `${name}[{{${ph}}}]`;
            if (isArrayText(input)) {
                return [
                    attachShowIf(
                        {
                            type: 'oneTypeGroup',
                            index: ph,
                            withAddButton: true,
                            title: `${input.title} {{${ph}}}`,
                            fields: [{type: 'textInput', name: itemPath, title: input.title}],
                        },
                        input,
                    ),
                ];
            }
            if (isArrayObject(input)) {
                return [
                    attachShowIf(
                        {
                            type: 'oneTypeGroup',
                            index: ph,
                            withAddButton: true,
                            title: `${input.title} {{${ph}}}`,
                            fields: convertInputs(
                                input.properties ?? [],
                                itemPath,
                                arrayDepth + 1,
                                placeholder,
                            ),
                        },
                        input,
                    ),
                ];
            }
            return [];
        }
        case 'oneOf':
        case 'anyOf': {
            const o = input as OneOfInput | AnyOfInput;
            const metaKey = oneOfDiscriminatorKey(pathPrefix, o.name);
            const variantOptions = o.options.map((opt) => ({
                value: String(opt.value),
                content: opt.title,
            }));
            const variantSwitcher = {
                type: 'segmentedRadioGroup' as const,
                name: metaKey,
                title: 'Variant',
                options: variantOptions,
                ...(variantOptions.length > 0 ? {defaultValue: variantOptions[0].value} : {}),
            };
            const branchFields = o.options.flatMap((opt, optionIndex) => {
                const branchWhen = branchWhenForOption(metaKey, String(opt.value), optionIndex);
                const converted = convertInputs(opt.properties, name, arrayDepth, placeholder);
                return applyBranchWhenToFields(converted, branchWhen);
            });
            return [
                attachShowIf(
                    {
                        type: 'section',
                        title: o.title,
                        fields: [variantSwitcher, ...branchFields],
                    },
                    input,
                ),
            ];
        }
        default:
            return [];
    }
}

/**
 * Build v2 `Fields` from AJV schema through the v1 parser (`generateFromAJV`).
 */
export function generateFormFieldsFromAjvSchema(
    schema: JSONSchemaType<{}>,
    options?: GenerateFormFieldsFromAjvSchemaOptions,
): Fields {
    const placeholder = options?.arrayIndexPlaceholder ?? defaultArrayPlaceholder;
    const inputs = generateFromAJV(schema);
    const inner = sortGeneratedFieldsSectionsLast(convertInputs(inputs, '', 0, placeholder));
    if (options?.wrapInRootSection) {
        return [
            {
                type: 'section',
                title: options.rootSectionTitle ?? 'Settings',
                fields: inner,
            },
        ];
    }
    return inner;
}
