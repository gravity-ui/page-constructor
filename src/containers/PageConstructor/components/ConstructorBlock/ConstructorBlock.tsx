import React from 'react';

import {Block, WithChildren} from '../../../../models';
import BlockBase from '../../../../components/BlockBase/BlockBase';
import {block} from '../../../../utils';

const b = block('constructor-block');
interface ConstructorBlockProps {
    data: Block;
}

export const ConstructorBlock: React.FC<WithChildren<ConstructorBlockProps>> = ({
    data,
    children,
}) => {
    const {anchor, visible, type} = data;

    return (
        <BlockBase
            className={b({type})}
            anchor={anchor}
            visible={visible}
            resetPaddings={data.resetPaddings}
        >
            {children}
        </BlockBase>
    );
};
