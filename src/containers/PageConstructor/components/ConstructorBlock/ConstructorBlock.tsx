import React from 'react';

import BlockBase, {BlockBaseFullProps} from '../../../../components/BlockBase/BlockBase';
import {Block, WithChildren} from '../../../../models';
import {block} from '../../../../utils';

interface ConstructorBlockProps extends Pick<BlockBaseFullProps, 'index'> {
    data: Block;
}

const b = block('constructor-block');

export const ConstructorBlock: React.FC<WithChildren<ConstructorBlockProps>> = ({
    index = 0,
    data,
    children,
}) => {
    const {anchor, visible, type} = data;

    return (
        <BlockBase
            type={type}
            index={index}
            className={b({type})}
            anchor={anchor}
            visible={visible}
            resetPaddings={data.resetPaddings}
        >
            {children}
        </BlockBase>
    );
};
