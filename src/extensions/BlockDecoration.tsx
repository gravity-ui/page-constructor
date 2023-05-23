import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {InnerContext} from '../context/innerContext';

export interface BlockDecorationProps extends PropsWithChildren {
    id?: string;
}

export const BlockDecoration = (props: PropsWithChildren<BlockDecorationProps>) => {
    const block = <Fragment>{props.children}</Fragment>;
    const blockDecorators = useContext(InnerContext).extensions?.blockDecorators;

    if (!blockDecorators) {
        return block;
    }

    return blockDecorators.reduce(
        (children, decorator) => <Fragment>{decorator({children, id: props.id})}</Fragment>,
        block,
    );
};
