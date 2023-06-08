import {Spec as DynamicFormSpec, ObjectSpec} from '@gravity-ui/dynamic-forms';

import {BlockType} from '../../../models';

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

export interface SchemaParserParams<T> {
    data: T;
    name: string;
    required?: boolean;
    definitions?: Record<string, ObjectSpec>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaParser<T = any> = (params: SchemaParserParams<T>) => CustomSpec;
