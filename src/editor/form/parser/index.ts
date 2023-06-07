/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {ArraySpec, ObjectSpec, SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {BlockType} from '../../../models';

import {ParserType, detectParserType} from './detect';
import {BlockSpec, CustomSpec, FormSpecs, SchemaParser, SchemaParserParams, Spec} from './types';
import {getArrayViewSpec, getObjectViewSpec, getOneOfViewSpec, getPrimitiveViewSpec} from './views';

class FormSpecParser {
    private definitions: Record<string, any> = {};

    parse(schema: any) {
        this.init(schema);

        return this.getFormSpec();
    }

    private getChildrenSpec = (data: ArraySpec) => {
        //@ts-ignore
        const childrenType = data.items?.$ref?.split('/')?.pop();

        return this.definitions[childrenType as keyof typeof this.definitions];
    };

    private childrenParser: SchemaParser = ({data, name, required}) => {
        const childSpec = _.cloneDeep(this.getChildrenSpec(data));

        const properties =
            childSpec &&
            Object.entries(childSpec).reduce(
                (parsedChildSpecProperties, [childName, childSchema]: [string, any]) => {
                    const childRequiredProperties = childSchema.required || [];
                    const childProperies =
                        childSchema.properties &&
                        Object.entries(childSchema.properties).reduce(
                            (parsedChildProperties, [childPropertyName, childPropertyData]) => {
                                parsedChildProperties[childPropertyName] = this.parseSchemaProperty(
                                    {
                                        data: childPropertyData,
                                        name: childPropertyName,
                                        required:
                                            childRequiredProperties.includes(childPropertyData),
                                    },
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
        const requiredProperties = data.required || [];
        const properties = data.oneOf.reduce(
            (result: Record<string, Spec>, propertyData: any, index: number) => {
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
            viewSpec: getOneOfViewSpec(name),
        };
    };

    private arrayParser: SchemaParser = ({data, name}): Spec => {
        const items = this.parseSchemaProperty({data: data.items as ObjectSpec, name});

        return {
            ...data,
            items,
            viewSpec: getArrayViewSpec(name),
        };
    };

    private objectParser: SchemaParser = ({data, name, required}): Spec => {
        const requiredProperties = data.required || [];
        const properties =
            data.properties &&
            Object.entries(data.properties).reduce((result, [propertyName, propertyData]) => {
                result[propertyName] = this.parseSchemaProperty({
                    data: propertyData,
                    name: propertyName,
                    required: requiredProperties.includes(propertyName),
                });

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

    private primitiveParser: SchemaParser = ({data, name, required}): Spec => {
        return {
            ...data,
            required,
            viewSpec: getPrimitiveViewSpec(name, data),
            validator: 'base',
        };
    };

    //eslint-disable-next-line @typescript-eslint/member-ordering
    private schemaParserMap = {
        [ParserType.Object]: this.objectParser,
        [ParserType.Array]: this.arrayParser,
        [ParserType.Primitive]: this.primitiveParser,
        [ParserType.OneOf]: this.oneOfParser,
        [ParserType.Children]: this.childrenParser,
    };

    private parseSchemaProperty({data, name, required}: SchemaParserParams<any>): CustomSpec {
        const parserType = detectParserType(data);
        const parser = this.schemaParserMap[parserType];

        return {
            ...parser({data, name, required}),
            //save json schema from constructor to compare with incoming intial data inside oneOf form fields
            __schema: data,
        };
    }

    private getFormSpec() {
        const blocks = this.definitions.children;

        return Object.values(BlockType).reduce((result, blockName) => {
            result[blockName] = this.parseSchemaProperty({
                name: blockName,
                data: {...(blocks[blockName] as BlockSpec)},
                required: true,
            });

            return result;
        }, {} as FormSpecs);
    }

    private init(schema: any) {
        this.definitions = Object.entries(schema.definitions).reduce(
            (result, [childType, childSpec]) => {
                //@ts-ignore
                result[childType] = childSpec?.selectCases;

                return result;
            },
            {} as Record<string, ObjectSpec>,
        );
    }
}

export default new FormSpecParser();
