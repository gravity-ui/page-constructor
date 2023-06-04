import {ArraySpec, ObjectSpec, Spec, SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {BlockType} from '../../models';
import {generateDefaultSchema} from '../../schema';
import {blockSchemas, cardSchemas} from '../../schema/constants';

export type FormSpecs = Record<BlockType, Spec>;
export type BlockSpec = Spec & {
    inputType?: Spec['viewSpec']['type'];
    required?: string[];
};

const IGNORED_PROPERTIES = ['additionalProperties'];
const childrenDefinitions = Object.entries(generateDefaultSchema().definitions).reduce(
    (result, [childType, childSpec]) => {
        //@ts-ignore
        result[childType] = childSpec?.selectCases;

        return result;
    },
    {} as Record<string, ObjectSpec>,
);

const getFiedValidator = (type: SpecTypes) => (type === SpecTypes.Number ? 'number' : 'base');
const isObject = (data: Spec): data is ObjectSpec => 'properties' in data;
const isArray = (data: Spec): data is ArraySpec => 'type' in data && data.type === SpecTypes.Array;
const isChildren = (data: Spec): data is ArraySpec =>
    'type' in data &&
    data.type === SpecTypes.Array &&
    'items' in data &&
    typeof data.items !== 'undefined' &&
    '$ref' in data.items;
const getObjectViewSpec = (data: ObjectSpec, layoutTitle: string) => {
    return {
        layoutTitle,
        type: 'base',
        layout: 'accordeon',
        order: data.properties && Object.keys(data.properties).sort(),
    };
};
const getArrayViewSpec = (layoutTitle: string) => ({
    layoutTitle,
    type: 'base',
    layout: 'accordeon',
    layoutOpen: true,
    itemLabel: 'Add Item',
});
const getFieldViewSpec = (layoutTitle: string, data: BlockSpec) => {
    let type = data.inputType || 'base';

    if ('enum' in data && data.enum) {
        type = 'select';
    }
    return {
        layout: 'row',
        type,
        layoutTitle,
    };
};

const getChildrenSpec = (data: ArraySpec) => {
    //@ts-ignore
    const childrenType = data.items?.$ref?.split('/')?.pop();

    return childrenDefinitions[childrenType as keyof typeof childrenDefinitions];
};

const getBlockSpec = (type: BlockType, schema: BlockSpec) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseSchemaProperty = (data: any, name: string, required?: boolean): Spec => {
        const requiredProperties = data.required || [];

        if ('oneOf' in data) {
            const properties = data.oneOf.reduce(
                (result: Record<string, Spec>, propertyData: any, index: number) => {
                    const propertyName = propertyData?.optionName
                        ? propertyData?.optionName
                        : `${name}_${index}`;
                    // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
                    result[propertyName] = parseSchemaProperty(
                        propertyData,
                        propertyName,
                        requiredProperties.includes(propertyName),
                    );
                    return result;
                },
                {} as Record<string, ObjectSpec>,
            );

            return {
                type: SpecTypes.Object,
                properties,
                viewSpec: {
                    type: 'oneof_custom',
                    layout: 'row',
                    layoutTitle: name,
                    oneOfParams: {
                        toggler: 'select',
                    },
                },
                required,
            };
        } else if (isChildren(data)) {
            const childSpec = _.cloneDeep(getChildrenSpec(data));
            console.log('childSpec', childSpec);
            const properties =
                childSpec &&
                Object.entries(childSpec).reduce((result, [childName, childSchema]) => {
                    const childRequiredProperties = childSchema.required || [];
                    const childProperies =
                        childSchema.properties &&
                        Object.entries(childSchema.properties).reduce(
                            (r, [childPropertyName, childPropertyData]) => {
                                if (!IGNORED_PROPERTIES.includes(childPropertyName)) {
                                    // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
                                    r[childPropertyName] = parseSchemaProperty(
                                        childPropertyData,
                                        childPropertyName,
                                        childRequiredProperties.includes(childPropertyData),
                                    );
                                }

                                return r;
                            },
                            {} as Record<string, Spec>,
                        );

                    result[childName] = {
                        items: {
                            ...childSchema,
                            type: SpecTypes.Object,
                            properties: {
                                ...childProperies,
                                type: {
                                    type: SpecTypes.String,
                                    defaultValue: childName,
                                    viewSpec: {
                                        type: 'hidden',
                                    },
                                },
                            },
                            viewSpec: getObjectViewSpec(childProperies, childName),
                        },
                        type: SpecTypes.Array,
                        required: false,
                        viewSpec: getArrayViewSpec(childName),
                    };

                    return result;
                }, {} as Record<string, Spec>);

            console.log('properties', properties);
            return {
                type: SpecTypes.Object,
                properties,
                viewSpec: {
                    type: 'oneof_custom',
                    layout: 'row',
                    layoutTitle: name,
                    oneOfParams: {
                        toggler: 'select',
                    },
                },
                required,
            };
        } else if (isObject(data)) {
            const properties =
                data.properties &&
                Object.entries(data.properties).reduce((result, [propertyName, propertyData]) => {
                    if (!IGNORED_PROPERTIES.includes(propertyName)) {
                        // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
                        result[propertyName] = parseSchemaProperty(
                            propertyData,
                            propertyName,
                            requiredProperties.includes(propertyName),
                        );
                    }

                    return result;
                }, {} as Record<string, Spec>);

            return {
                ...data,
                properties,
                type: SpecTypes.Object,
                viewSpec: getObjectViewSpec(data, name),
                required,
            };
        } else if (isArray(data)) {
            const items = parseSchemaProperty(data.items as ObjectSpec, name);

            return {
                ...data,
                items,
                viewSpec: getArrayViewSpec(name),
            };
        } else {
            return {
                ...data,
                required,
                viewSpec: getFieldViewSpec(name, data),
                validator: getFiedValidator(data.type),
            };
        }
    };

    return parseSchemaProperty({...schema}, type, true);
};

export const convertFormSchemaToJson = (schema: any) => {
    const copy = _.cloneDeep(schema);

    const parseSchema = (inner: any) => {
        delete inner.required;
        delete inner.viewSpec;

        if (inner.properties) {
            Object.entries(inner.properties).forEach(([_key, value]) => {
                parseSchema(value);
            });
        }

        if (inner.items) {
            parseSchema(inner.items);
        }
    };
    parseSchema(copy);

    return copy;
};

export const blockSpecs = Object.values(BlockType).reduce((result, blockName) => {
    // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
    result[blockName] = getBlockSpec(blockName, blockSchemas[blockName] as BlockSpec);

    return result;
}, {} as FormSpecs);

export const cardSpecs = {
    oneOf: Object.entries(cardSchemas).map(([type, schema]) => ({
        ...schema,
        optionName: type,
    })),
};
