/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
import {ArraySpec, ObjectSpec, SpecTypes} from '@gravity-ui/dynamic-forms';

import {Schema, SchemaDefinitions} from '../../../schema';

import {ParserType, detectParserType} from './detect';
import {
    BlocksSpec,
    CustomSpec,
    FormSpecs,
    PageSpec,
    SchemaParser,
    SchemaParserParams,
    Spec,
} from './types';
import {getArrayViewSpec, getObjectViewSpec, getOneOfViewSpec, getPrimitiveViewSpec} from './views';

class FormSpecParser {
    private schema: Schema = {};
    private definitions: SchemaDefinitions = {};

    /**
     * Transforms page-constructor json schema into dynamic-forms specs for each block
     *
     * @param schema {Schema} - page-constructor json schema
     * @returns {FormSpecs} - object containig dynamic-forms specs for each constructor block
     */
    parse(schema: Schema) {
        this.init(schema);

        return this.getFormSpec();
    }

    private getChildrenSpec = (data: Schema) => {
        const childrenType = (data.items as Schema)?.$ref?.split('/')?.pop();

        return this.definitions[childrenType as keyof typeof this.definitions];
    };

    private getRequiredProperties = (data: Schema) =>
        Array.isArray(data.required) ? data.required : [];

    private childrenParser: SchemaParser = ({data, name, required}) => {
        const childSpec = this.getChildrenSpec(data);

        const properties =
            childSpec &&
            Object.entries(childSpec).reduce(
                (parsedChildSpecProperties, [childName, childSchema]: [string, Schema]) => {
                    const childRequiredProperties = this.getRequiredProperties(childSchema);
                    const childProperies =
                        childSchema.properties &&
                        Object.entries(childSchema.properties).reduce(
                            (parsedChildProperties, [childPropertyName, childPropertyData]) => {
                                parsedChildProperties[childPropertyName] = this.parseSchemaProperty(
                                    {
                                        data: childPropertyData,
                                        name: childPropertyName,
                                        required:
                                            childRequiredProperties.includes(childPropertyName),
                                    },
                                );

                                return parsedChildProperties;
                            },
                            {} as Record<string, CustomSpec>,
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
                        type: SpecTypes.Array,
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
                            viewSpec:
                                childProperies &&
                                getObjectViewSpec({
                                    properties: childProperies,
                                    layoutTitle: childName,
                                }),
                            __schema: childJsonSchema,
                        } as ObjectSpec,
                        required: false,
                        viewSpec: getArrayViewSpec({layoutTitle: childName}),
                        __schema: {
                            type: SpecTypes.Array,
                            items: childJsonSchema,
                        },
                    } as ArraySpec;

                    return parsedChildSpecProperties;
                },
                {} as Record<string, CustomSpec>,
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
        } as CustomSpec;
    };

    private oneOfParser: SchemaParser = ({data, name, required}): Spec => {
        const requiredProperties = this.getRequiredProperties(data);
        const properties =
            data.oneOf &&
            data.oneOf.reduce(
                (result: Record<string, Spec>, propertyData, index) => {
                    const propertyName = propertyData?.optionName
                        ? propertyData?.optionName
                        : `${name}_${index}`;
                    result[propertyName] = this.parseSchemaProperty({
                        data: propertyData,
                        name: propertyName,
                        required: requiredProperties.includes(propertyName),
                    });
                    return result;
                },
                {} as Record<string, ObjectSpec>,
            );

        return {
            type: SpecTypes.Object,
            properties,
            required,
            viewSpec: getOneOfViewSpec({layoutTitle: name}),
        } as ObjectSpec;
    };

    private arrayParser: SchemaParser = ({data, name}): Spec => {
        const items = data.items && this.parseSchemaProperty({data: data.items, name});

        return {
            ...data,
            type: SpecTypes.Array,
            items,
            viewSpec: getArrayViewSpec({layoutTitle: name}),
        } as ArraySpec;
    };

    private objectParser: SchemaParser = ({data, name, required}): Spec => {
        const requiredProperties = this.getRequiredProperties(data);
        const properties =
            data.properties &&
            Object.entries(data.properties).reduce(
                (result, [propertyName, propertyData]) => {
                    result[propertyName] = this.parseSchemaProperty({
                        data: propertyData,
                        name: propertyName,
                        required: requiredProperties.includes(propertyName),
                    });

                    return result;
                },
                {} as Record<string, Spec>,
            );

        return {
            ...data,
            type: SpecTypes.Object,
            properties,
            viewSpec: getObjectViewSpec({properties, layoutTitle: name}),
            required,
        } as ObjectSpec;
    };

    private primitiveParser: SchemaParser = ({data, name, required}): Spec => {
        return {
            ...data,
            type: data.type as SpecTypes,
            required,
            defaultValue: data.default,
            viewSpec: getPrimitiveViewSpec({layoutTitle: name, data}),
            validator: 'base',
        } as Spec;
    };

    //eslint-disable-next-line @typescript-eslint/member-ordering
    private schemaParserMap = {
        [ParserType.Object]: this.objectParser,
        [ParserType.Array]: this.arrayParser,
        [ParserType.Primitive]: this.primitiveParser,
        [ParserType.OneOf]: this.oneOfParser,
        [ParserType.Children]: this.childrenParser,
    };

    private parseSchemaProperty({data, name, required}: SchemaParserParams): CustomSpec {
        const parserType = detectParserType(data);
        const parser = this.schemaParserMap[parserType];

        return {
            ...parser({data, name, required}),
            //save json schema from constructor to compare with incoming intial data inside oneOf form fields
            __schema: data,
        };
    }

    private getBlocksSpec() {
        const blocks = this.definitions.children;

        return Object.entries(blocks).reduce((result, [blockName, blockData]) => {
            result[blockName] = this.parseSchemaProperty({
                name: blockName,
                data: {...blockData},
                required: true,
            });

            return result;
        }, {} as BlocksSpec);
    }

    private getPageSpec() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {blocks, ...pageSchema} = this.schema?.properties || {};
        const requiredProperties = this.getRequiredProperties(this.schema);

        const properties = Object.entries(pageSchema).reduce(
            (result, [propertyName, propertyData]) => {
                result[propertyName] = this.parseSchemaProperty({
                    name: propertyName,
                    data: propertyData,
                    required: requiredProperties.includes(propertyName),
                });

                return result;
            },
            {} as Record<string, CustomSpec>,
        );

        return {
            type: SpecTypes.Object,
            properties,
            viewSpec: getObjectViewSpec({properties, layout: 'section'}),
            required: true,
        } as PageSpec;
    }

    private getFormSpec() {
        return {
            blocks: this.getBlocksSpec(),
            page: this.getPageSpec(),
        } as FormSpecs;
    }

    private init(schema: Schema) {
        this.schema = schema;

        if (schema.definitions) {
            this.definitions = Object.entries(schema.definitions).reduce(
                (result, [childType, childSpec]) => {
                    result[childType] = childSpec?.selectCases;

                    return result;
                },
                {} as SchemaDefinitions,
            );
        }
    }
}

export default new FormSpecParser();
