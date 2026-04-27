import * as React from 'react';

import {BlockType, ConstructorItem} from './constructor-items';

export interface BlockWrapperDataProps<T = object> {
    type: string;
    index?: number;
    props?: T;
    content?: ConstructorItem & T;
}

/**
 * @deprecated Use BlockWrapperDataProps instead.
 * BlockDecorationProps will be removed in the next major version.
 */
export interface BlockDecorationProps
    extends React.PropsWithChildren,
        Omit<BlockWrapperDataProps, 'type'> {
    type: BlockType | string;
}

/**
 * @deprecated Use PageConstructorExtension with blockWrapper instead.
 */
export type BlockDecorator = (props: BlockDecorationProps) => React.ReactElement;
