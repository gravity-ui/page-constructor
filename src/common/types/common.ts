import type React from 'react';
import {PropsWithChildren} from 'react';
import {BlockConfig} from '../../form-generator-v2/types';

export interface ItemConfig {
    type: string;
    schema: BlockConfig;
}

export interface PageConstructorWrapperProps extends PropsWithChildren {}

export type PageConstructorWrapper<WrapperProps> = React.ComponentType<
    WrapperProps & PageConstructorWrapperProps
>;

export interface PageConstructorSettings<WrapperProps> {
    wrapper?: PageConstructorWrapper<WrapperProps>;
    wrapperProps?: WrapperProps;
}
