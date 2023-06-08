import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {InnerContext} from '../context/innerContext';
import {BlockDecorationProps} from '../models';

export const BlockDecoration = ({
    id,
    children: blockChildren,
}: PropsWithChildren<BlockDecorationProps>) => {
    const block = <Fragment>{blockChildren}</Fragment>;
    const blockDecorators = useContext(InnerContext).customization?.decorators?.block;

    if (!blockDecorators) {
        return block;
    }

    return blockDecorators.reduce(
        (children, decorator) => <Fragment>{decorator({children, id})}</Fragment>,
        block,
    );
};
