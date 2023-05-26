import {PropsWithChildren} from 'react';

export interface BlockDecorationProps extends PropsWithChildren {
    id: string | number;
}

export interface BlockDecoratorProps extends PropsWithChildren {
    id: string;
    isHeader?: boolean;
}

export type BlockDecorator = (props: BlockDecoratorProps) => React.ReactElement;
