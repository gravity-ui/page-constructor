import React, {ReactElement} from 'react';

import {Block, ShouldRenderBlock, ReactFCC} from '../../../../models';
import BlockBase from '../../../../components/BlockBase/BlockBase';
import {block} from '../../../../utils';

const b = block('constructor-block');
interface ConstructorBlockProps {
    data: Block;
    Component: ReactElement;
    shouldRenderBlock?: ShouldRenderBlock;
}

export const ConstructorBlock: ReactFCC<ConstructorBlockProps> = ({data, Component}) => {
    const {anchor, visible} = data;

    return (
        <BlockBase
            className={b({type: data.type})}
            anchor={anchor}
            visible={visible}
            resetPaddings={data.resetPaddings}
        >
            {Component}
        </BlockBase>
    );
};
