import {PropsWithChildren} from 'react';

import {BlockType} from './constructor-items';

export interface BlockDecorationProps extends PropsWithChildren {
    type: BlockType;
    index?: number;
}
export type BlockDecorator = (props: BlockDecorationProps) => React.ReactElement;
