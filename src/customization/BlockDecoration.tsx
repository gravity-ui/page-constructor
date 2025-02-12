import * as React from 'react';

import {InnerContext} from '../context/innerContext';
import {BlockDecorationProps} from '../models';

export const BlockDecoration = ({
    children: blockChildren,
    ...rest
}: React.PropsWithChildren<BlockDecorationProps>) => {
    const blockDecorators = React.useContext(InnerContext).customization?.decorators?.block;

    const content = blockDecorators
        ? blockDecorators.reduce(
              (children, decorator) => decorator({children, ...rest}),
              blockChildren,
          )
        : blockChildren;

    return <React.Fragment>{content}</React.Fragment>;
};
