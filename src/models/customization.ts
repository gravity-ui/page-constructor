import {PropsWithChildren} from 'react';

import {BlockBaseProps, BlockType} from './constructor-items';

export interface BlockDecorationProps extends PropsWithChildren, BlockBaseProps {
    type: BlockType;
    index?: number;
}
export type BlockDecorator = (props: BlockDecorationProps) => React.ReactElement;
