import {PropsWithChildren} from 'react';

export interface BlockDecorationProps extends PropsWithChildren {
    id?: string;
}

export interface BlockDecoratorProps extends PropsWithChildren {
    id: string | number;
    isHeader?: boolean;
}

export type BlockDecorator = (props: BlockDecoratorProps) => React.ReactElement;
