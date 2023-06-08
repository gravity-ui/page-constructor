import {PropsWithChildren} from 'react';

import {BlockBaseProps} from './constructor-items';

export type BlockDecorationProps = Pick<BlockBaseProps, 'index' | 'type'> & PropsWithChildren;
export type BlockDecorator = (props: BlockDecorationProps) => React.ReactElement;
