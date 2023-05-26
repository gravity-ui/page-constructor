import React, {Fragment, PropsWithChildren, useContext} from 'react';

import {BlockIdContext} from '../context/blockIdContext';
import {InnerContext} from '../context/innerContext';
import {BlockDecorationProps} from '../models';
import {getBlockIndexFromId} from '../utils';

export const BlockDecoration = (props: PropsWithChildren<BlockDecorationProps>) => {
    const blockContenxtId = getBlockIndexFromId(useContext(BlockIdContext));
    const {headerBlockTypes} = useContext(InnerContext);
    const blockId = props.id || blockContenxtId;
    const isHeader = Boolean(props.id && headerBlockTypes.includes(props.id));

    const block = <Fragment>{props.children}</Fragment>;
    const blockDecorators = useContext(InnerContext).customization?.decorators?.block;

    if (!blockDecorators) {
        return block;
    }

    return blockDecorators.reduce(
        (children, decorator) => (
            <Fragment>{decorator({children, id: blockId, isHeader})}</Fragment>
        ),
        block,
    );
};
