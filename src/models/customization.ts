import {PropsWithChildren} from 'react';

export interface BlockDecorationProps extends PropsWithChildren {
    id?: string;
}
export type BlockDecorator = (props: BlockDecorationProps) => React.ReactElement;
