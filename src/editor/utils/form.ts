/* eslint-disable no-param-reassign */
/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */

import {Spec, SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {BlockType} from '../../models';
import {blockSchemas} from '../../schema/constants';

const ignoredProperties = ['additionalProperties'];

const getObjectViewSpec = (layoutTitle: string) => ({
    type: 'base',
    layout: 'section',
    layoutTitle,
});
const getArrayViewSpec = (itemLabel: string) => ({
    type: 'base',
    layout: 'accordeon',
    layoutTitle: 'Labels',
    layoutOpen: true,
    itemLabel,
});
const getFieldViewSpec = (layoutTitle: string, hasEnum?: boolean) => ({
    type: hasEnum ? 'select' : 'base',
    layout: 'row',
    layoutTitle,
});

const getFiedValidator = (type: SpecTypes) => (type === SpecTypes.Number ? 'number' : 'base');
const isObject = (data: Object) => 'properties' in data;
const isArray = (data: Object) => 'type' in data && data.type === SpecTypes.Array;

const getBlockSpec = (type: BlockType, schema: object) => {
    const result = _.cloneDeep(schema) as Spec;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseSchemaProperty = (data: any, name: string, required?: boolean) => {
        if (isObject(data)) {
            const requiredProperties = data.required || [];
            data.type = SpecTypes.Object;
            data.viewSpec = getObjectViewSpec(name);

            Object.entries(data.properties).forEach(([propertyName, propertyData]) => {
                if (ignoredProperties.includes(name)) {
                    delete data.properties[name];
                } else {
                    parseSchemaProperty(
                        propertyData,
                        propertyName,
                        requiredProperties.includes(propertyName),
                    );
                }
            });
            data.required = required;
        } else if (isArray(data)) {
            data.viewSpec = getArrayViewSpec(name);
            parseSchemaProperty(data.items, `${name}Item`);
        } else {
            data.required = required;
            data.viewSpec = getFieldViewSpec(name, Boolean(data.enum));
            data.validator = getFiedValidator(data.type);
        }
    };

    parseSchemaProperty(result, type, true);
    result.viewSpec.layout = 'accordeon';
    // result.viewSpec.layoutOpen = true;
    return result as Spec;
};

export type FormSpecs = Record<BlockType, Spec>;

export const blockSpecs = Object.values(BlockType).reduce((result, blockName) => {
    result[blockName] = getBlockSpec(blockName, blockSchemas[blockName]);

    return result;
}, {} as FormSpecs);
