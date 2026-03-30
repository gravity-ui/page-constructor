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

function mergeWhen(existing: When | undefined, extra: When | undefined): When | undefined {
    if (!extra?.length) {
        return existing;
    }
    if (!existing?.length) {
        return extra;
    }
    return [...existing, {operator: '&&' as const}, ...extra];
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
        return [
            {field: metaKey, operator: '===', value: String(optValue)},
            {operator: '||'},
            {field: metaKey, operator: '===', value: undefined},
        ];
    }
    return [{field: metaKey, operator: '===', value: String(optValue)}];
}

/** Merge parent object `showIf` onto leaves (when nested object is flattened without a section). */
function applyParentShowIfToFields(fields: Fields, parentInput: ConfigInput): Fields {
    const w = parseShowIfToWhen(parentInput.showIf);
    if (!w?.length) {
        return fields;
    }
    return fields.map((field) => {
        if (field.type === 'section' && 'fields' in field) {
            return {
                ...field,
                fields: applyParentShowIfToFields(field.fields, parentInput),
            };
        }
        if (field.type === 'oneTypeGroup' && 'fields' in field) {
            return {
                ...field,
                fields: applyParentShowIfToFields(field.fields, parentInput),
            };
        }
        return {
            ...field,
            when: mergeWhen(field.when, w),
        };
    });
}

function applyBranchWhenToFields(fields: Fields, branchWhen: When | undefined): Fields {
    if (!branchWhen?.length) {
        return fields;
    }
    return fields.map((field) => {
        if (field.type === 'section' && 'fields' in field) {
            return {
                ...field,
                fields: applyBranchWhenToFields(field.fields, branchWhen),
            };
        }
        if (field.type === 'oneTypeGroup' && 'fields' in field) {
            return {
                ...field,
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

function convertInputs(
    inputs: ConfigInput[],
    pathPrefix: string,
    arrayDepth: number,
    placeholder: (d: number) => string,
    objectDepth: number,
): Fields {
    return inputs.flatMap((input) =>
        convertOne(input, pathPrefix, arrayDepth, placeholder, objectDepth),
    );
}

function convertOne(
    input: ConfigInput,
    pathPrefix: string,
    arrayDepth: number,
    placeholder: (d: number) => string,
    objectDepth: number,
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
                fields.push(...convertInputs(nested, name, arrayDepth, placeholder, objectDepth));
            }
            return fields;
        }
        case 'object': {
            const obj = input as ObjectInput;
            const childObjectDepth = objectDepth + 1;
            const nestedFields = convertInputs(
                obj.properties,
                name,
                arrayDepth,
                placeholder,
                childObjectDepth,
            );
            if (objectDepth >= 1) {
                return applyParentShowIfToFields(nestedFields, input);
            }
            return [
                attachShowIf(
                    {
                        type: 'section',
                        title: obj.title,
                        opened: true,
                        fields: nestedFields,
                    },
                    input,
                ),
            ];
        }
        case 'array': {
            const ph = placeholder(arrayDepth);
            const itemPath = `${name}[{{${ph}}}]`;
            if (isArrayText(input)) {
                return [
                    attachShowIf(
                        {
                            type: 'oneTypeGroup',
                            index: ph,
                            withAddButton: true,
                            title: `Item {{${ph}}}`,
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
                            title: `Item {{${ph}}}`,
                            fields: convertInputs(
                                input.properties ?? [],
                                itemPath,
                                arrayDepth + 1,
                                placeholder,
                                0,
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
                const converted = convertInputs(
                    opt.properties,
                    name,
                    arrayDepth,
                    placeholder,
                    objectDepth,
                );
                return applyBranchWhenToFields(converted, branchWhen);
            });
            return [
                attachShowIf(
                    {
                        type: 'section',
                        title: o.title,
                        opened: true,
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
    const inner = convertInputs(inputs, '', 0, placeholder, 0);
    if (options?.wrapInRootSection) {
        return [
            {
                type: 'section',
                title: options.rootSectionTitle ?? 'Settings',
                opened: true,
                fields: inner,
            },
        ];
    }
    return inner;
}
