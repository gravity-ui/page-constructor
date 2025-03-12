import React, {PropsWithChildren} from 'react';

import {usePCEditorItemWrap} from '../../../hooks/usePCEditorItemWrap';
import {block} from '../../../utils';

import './ItemWrap.scss';

const b = block('item-wrap');

export interface ItemWrapProps extends PropsWithChildren {
    index: number;
}

const ItemWrap = ({index, children}: ItemWrapProps) => {
    const {blockRef, adminBlockMouseEvents} = usePCEditorItemWrap(index);
    return (
        <div ref={blockRef} className={b()} {...adminBlockMouseEvents}>
            {children}
        </div>
    );
};

export default ItemWrap;
