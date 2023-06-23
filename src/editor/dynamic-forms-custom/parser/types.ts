import {Spec as DynamicFormSpec, ObjectSpec} from '@gravity-ui/dynamic-forms';

import {Schema} from '../../../schema';

export type OneOfSpec = {
    oneOf: DynamicFormSpec[];
    viewSpec: ObjectSpec['viewSpec'];
};

export type CustomObjectSpec = Omit<ObjectSpec, 'properties'> & {
    properties: Record<string, CustomSpec>;
};

export interface SpecCustomProps {
    disabled?: boolean;
    inputType?: string;
    __schema?: Schema;
}

export type Spec = Exclude<DynamicFormSpec, 'ObjectSpec'> | CustomObjectSpec | OneOfSpec;
export type CustomSpec = Spec & SpecCustomProps;
export type BlocksSpec = Record<string, CustomSpec>;
export type PageSpec = CustomSpec;
export interface FormSpecs {
    blocks: BlocksSpec;
    page: PageSpec;
}

export interface SchemaParserParams {
    data: Schema;
    name: string;
    required?: Schema['required'];
}

export type SchemaParser = (params: SchemaParserParams) => CustomSpec;
