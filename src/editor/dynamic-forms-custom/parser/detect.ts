import {ArraySpec, ObjectSpec, SpecTypes} from '@gravity-ui/dynamic-forms';
import _ from 'lodash';

import {OneOfSpec, Spec} from './types';

export enum ParserType {
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

export const detectParserType = (data: Spec): ParserType => {
    for (const {type, detector} of ParserTypeDetectors) {
        if (detector(data)) {
            return type as ParserType;
        }
    }

    return ParserType.Primitive;
};
