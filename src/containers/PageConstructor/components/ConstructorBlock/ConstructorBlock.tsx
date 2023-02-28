import React from 'react';

import {Block, WithChildren} from '../../../../models';
import BlockBase from '../../../../components/BlockBase/BlockBase';
import {block} from '../../../../utils';
import {ItemWrapper} from '../../../../context/innerContext';

const b = block('constructor-block');
interface ConstructorBlockProps {
    data: Block;
}

const ConstructorBlock: React.FC<WithChildren<ConstructorBlockProps>> = ({data, children}) => {
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

export const withConstructorBlock: ItemWrapper = (item, key, data, {blockTypes}) => {
    return blockTypes.includes(data.type) ? (
        <ConstructorBlock data={data as Block} key={key}>
            {item}
        </ConstructorBlock>
    ) : (
        item
    );
};
