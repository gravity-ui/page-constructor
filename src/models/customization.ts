import * as React from 'react';

import {BlockBaseProps, BlockType} from './constructor-items';

export interface BlockDecorationProps extends React.PropsWithChildren, BlockBaseProps {
    type: BlockType | string;
    index?: number;
}
export type BlockDecorator = (props: BlockDecorationProps) => React.ReactElement;
