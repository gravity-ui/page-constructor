import {ArraySpec, Spec as DynamicFormSpec, ObjectSpec, SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {BlockType} from '../../models';
import {generateDefaultSchema} from '../../schema';
import {blockSchemas} from '../../schema/constants';

export type OneOfSpec = {
    oneOf: DynamicFormSpec[];
    viewSpec: ObjectSpec['viewSpec'];
};

export interface SpecCustomProps {
    __schema?: object;
}

export type Spec = DynamicFormSpec | OneOfSpec;
export type CustomSpec = Spec & SpecCustomProps;
export type FormSpecs = Record<BlockType, CustomSpec>;
export type BlockSpec = CustomSpec & {
    inputType?: Spec['viewSpec']['type'];
    required?: string[];
};
export type SchemaParser<T = any> = (data: T, name: string, required?: boolean) => CustomSpec;

const childrenDefinitions = Object.entries(generateDefaultSchema().definitions).reduce(
    (result, [childType, childSpec]) => {
        //@ts-ignore
        result[childType] = childSpec?.selectCases;

        return result;
    },
    {} as Record<string, ObjectSpec>,
);

const getChildrenSpec = (data: ArraySpec) => {
    //@ts-ignore
    const childrenType = data.items?.$ref?.split('/')?.pop();

    return childrenDefinitions[childrenType as keyof typeof childrenDefinitions];
};

const getFiedValidator = (type: SpecTypes) => (type === SpecTypes.Number ? 'number' : 'base');

enum ParserType {
    Object = 'object',
    Array = 'array',
    Children = 'children',
    OneOf = 'oneOf',
    Primitive = 'primitive',
}

const isOneOf = (data: Spec): data is OneOfSpec => 'oneOf' in data;
const isObject = (data: Spec): data is ObjectSpec => 'properties' in data;
const isArray = (data: Spec): data is ArraySpec => 'type' in data && data.type === SpecTypes.Array;
const isChildren = (data: Spec): data is ArraySpec =>
    'type' in data &&
    data.type === SpecTypes.Array &&
    'items' in data &&
    typeof data.items !== 'undefined' &&
    '$ref' in data.items;

const ParserTypeDetectors = [
    {type: ParserType.OneOf, detector: isOneOf},
    {type: ParserType.Children, detector: isChildren},
    {type: ParserType.Object, detector: isObject},
    {type: ParserType.Array, detector: isArray},
];

const getParserType = (data: Spec): ParserType => {
    for (const {type, detector} of ParserTypeDetectors) {
        if (detector(data)) {
            return type as ParserType;
        }
    }

    return ParserType.Primitive;
};

const getOneOfViewSpec = (layoutTitle: string) => {
    return {
        type: 'oneof_custom',
        layout: 'row',
        layoutTitle,
        oneOfParams: {
            toggler: 'select' as const,
        },
    };
};
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
const getPrimitiveViewSpec = (layoutTitle: string, data: BlockSpec) => {
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

const childrenParser: SchemaParser = (data, name, required) => {
    const childSpec = _.cloneDeep(getChildrenSpec(data));
    const properties =
        childSpec &&
        Object.entries(childSpec).reduce((parsedChildSpecProperties, [childName, childSchema]) => {
            const childRequiredProperties = childSchema.required || [];
            const childProperies =
                childSchema.properties &&
                Object.entries(childSchema.properties).reduce(
                    (parsedChildProperties, [childPropertyName, childPropertyData]) => {
                        parsedChildProperties[childPropertyName] = parseSchemaProperty(
                            childPropertyData,
                            childPropertyName,
                            childRequiredProperties.includes(childPropertyData),
                        );

                        return parsedChildProperties;
                    },
                    {} as Record<string, Spec>,
                );

            const childJsonSchema = {
                ...childSchema,
                properties: {
                    ...childSchema.properties,
                    type: {
                        type: SpecTypes.String,
                        enum: [childName],
                    },
                },
            };

            parsedChildSpecProperties[childName] = {
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
                    __schema: childJsonSchema,
                },
                type: SpecTypes.Array,
                required: false,
                viewSpec: getArrayViewSpec(childName),
                __schema: {
                    type: SpecTypes.Array,
                    items: childJsonSchema,
                },
            };

            return parsedChildSpecProperties;
        }, {} as Record<string, CustomSpec>);

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
    } as CustomSpec;
};

const oneOfParser: SchemaParser = (data, name, required): Spec => {
    const requiredProperties = data.required || [];
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
        required,
        viewSpec: getOneOfViewSpec(name),
    };
};

const arrayParser: SchemaParser = (data, name): Spec => {
    const items = parseSchemaProperty(data.items as ObjectSpec, name);

    return {
        ...data,
        items,
        viewSpec: getArrayViewSpec(name),
    };
};

const objectParser: SchemaParser = (data, name, required): Spec => {
    const requiredProperties = data.required || [];
    const properties =
        data.properties &&
        Object.entries(data.properties).reduce((result, [propertyName, propertyData]) => {
            result[propertyName] = parseSchemaProperty(
                propertyData,
                propertyName,
                requiredProperties.includes(propertyName),
            );

            return result;
        }, {} as Record<string, Spec>);

    return {
        ...data,
        properties,
        type: SpecTypes.Object,
        viewSpec: getObjectViewSpec(data, name),
        required,
    };
};

const primitiveParser: SchemaParser = (data, name, required): Spec => {
    return {
        ...data,
        required,
        viewSpec: getPrimitiveViewSpec(name, data),
        validator: getFiedValidator(data.type),
    };
};

const SchemaParserMap = {
    [ParserType.Object]: objectParser,
    [ParserType.Array]: arrayParser,
    [ParserType.Primitive]: primitiveParser,
    [ParserType.OneOf]: oneOfParser,
    [ParserType.Children]: childrenParser,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseSchemaProperty(data: any, name: string, required?: boolean): CustomSpec {
    const parserType = getParserType(data);
    const parser = SchemaParserMap[parserType];

    return {
        ...parser(data, name, required),
        //save json schema from constructor to compare with incoming intial data inside oneOf form fields
        __schema: data,
    };
}

function getBlockSpec(type: BlockType, schema: BlockSpec) {
    return parseSchemaProperty({...schema}, type, true);
}

export const blockSpecs = Object.values(BlockType).reduce((result, blockName) => {
    // eslint-disable-next-line no-param-reassign, no-not-accumulator-reassign/no-not-accumulator-reassign
    result[blockName] = getBlockSpec(blockName, blockSchemas[blockName] as BlockSpec);

    return result;
}, {} as FormSpecs);
