import {Spec as DynamicFormSpec, ObjectSpec} from '@gravity-ui/dynamic-forms';

import {BlockType} from '../../../models';
import {Schema} from '../../../schema';

export type OneOfSpec = {
    oneOf: DynamicFormSpec[];
    viewSpec: ObjectSpec['viewSpec'];
};

export interface SpecCustomProps {
    __schema?: Schema;
}

export type Spec = DynamicFormSpec | OneOfSpec;
export type CustomSpec = Spec & SpecCustomProps;
export type FormSpecs = Record<BlockType, CustomSpec>;

export interface SchemaParserParams {
    data: Schema;
    name: string;
    required?: Schema['required'];
}

export type SchemaParser = (params: SchemaParserParams) => CustomSpec;
