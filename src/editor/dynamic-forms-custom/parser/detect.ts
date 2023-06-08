import {SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {Schema} from '../../../schema';

export enum ParserType {
    Object = 'object',
    Array = 'array',
    Children = 'children',
    OneOf = 'oneOf',
    Primitive = 'primitive',
}

const isOneOf = (data: Schema) => 'oneOf' in data;
const isObject = (data: Schema) => 'properties' in data;
const isArray = (data: Schema) => 'type' in data && data.type === SpecTypes.Array;
const isChildren = (data: Schema) =>
    'type' in data &&
    data.type === SpecTypes.Array &&
    'items' in data &&
    typeof data.items !== 'undefined' &&
    '$ref' in data.items;

//detector applying order matters!
const ParserTypeDetectors = [
    {type: ParserType.OneOf, detector: isOneOf},
    {type: ParserType.Children, detector: isChildren},
    {type: ParserType.Object, detector: isObject},
    {type: ParserType.Array, detector: isArray},
];

export const detectParserType = (data: Schema): ParserType => {
    for (const {type, detector} of ParserTypeDetectors) {
        if (detector(data)) {
            return type as ParserType;
        }
    }

    return ParserType.Primitive;
};
