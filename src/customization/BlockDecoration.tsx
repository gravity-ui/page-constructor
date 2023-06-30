import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {InnerContext} from '../context/innerContext';
import {BlockDecorationProps} from '../models';

export const BlockDecoration = ({
    children: blockChildren,
    ...rest
}: PropsWithChildren<BlockDecorationProps>) => {
    const blockDecorators = useContext(InnerContext).customization?.decorators?.block;

    const content = blockDecorators
        ? blockDecorators.reduce(
              (children, decorator) => decorator({children, ...rest}),
              blockChildren,
          )
        : blockChildren;

    return <Fragment>{content}</Fragment>;
};
