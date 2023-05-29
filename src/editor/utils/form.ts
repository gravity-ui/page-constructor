/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */

import {ArraySpec, ObjectSpec, Spec, SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {BlockType} from '../../models';
import {blockSchemas} from '../../schema/constants';

type BlockSpec = Spec & {
    inputType?: Spec['viewSpec']['type'];
    required?: string[];
};

const ARRAY_ITEM_NAME = 'Item';
const IGNORED_PROPERTIES = ['additionalProperties'];

const getFiedValidator = (type: SpecTypes) => (type === SpecTypes.Number ? 'number' : 'base');
const isObject = (data: Spec): data is ObjectSpec => 'properties' in data;
const isArray = (data: Spec): data is ArraySpec => 'type' in data && data.type === SpecTypes.Array;
const getObjectViewSpec = (data: ObjectSpec, layoutTitle: string) => {
    return {
        type: 'base',
        layout: 'section',
        order: data.properties && Object.keys(data.properties).sort(),
        layoutTitle,
    };
};
const getArrayViewSpec = (itemLabel: string) => ({
    type: 'base',
    layout: 'accordeon',
    layoutTitle: itemLabel,
    layoutOpen: true,
    itemLabel,
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

const getBlockSpec = (type: BlockType, schema: BlockSpec) => {
    const result = _.cloneDeep(schema) as Spec;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseSchemaProperty = (data: any, name: string, required?: boolean) => {
        const requiredProperties = data.required || [];

        if (isObject(data)) {
            data.type = SpecTypes.Object;
            data.viewSpec = getObjectViewSpec(data, name);

            if (data.properties) {
                Object.entries(data.properties).forEach(([propertyName, propertyData]) => {
                    if (IGNORED_PROPERTIES.includes(name)) {
                        delete data.properties?.[name];
                    } else {
                        parseSchemaProperty(
                            propertyData as BlockSpec,
                            propertyName,
                            requiredProperties.includes(propertyName),
                        );
                    }
                });
                data.required = required;
            }
        } else if (isArray(data)) {
            data.viewSpec = getArrayViewSpec(name);
            parseSchemaProperty(data.items as ObjectSpec, ARRAY_ITEM_NAME);
        } else {
            data.required = required;
            data.viewSpec = getFieldViewSpec(name, data);
            data.validator = getFiedValidator(data.type);
        }
    };

    parseSchemaProperty(result, type, true);
    result.viewSpec.layout = 'accordeon';

    return result as Spec;
};

export type FormSpecs = Record<BlockType, Spec>;

export const blockSpecs = Object.values(BlockType).reduce((result, blockName) => {
    result[blockName] = getBlockSpec(blockName, blockSchemas[blockName] as BlockSpec);

    return result;
}, {} as FormSpecs);
