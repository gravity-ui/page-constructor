import React, {PropsWithChildren, useContext} from 'react';

import useEditorBlockMouseEvents from '../../../containers/PageConstructor/components/ConstructorBlock/hooks/useEditorBlockMouseEvents';
import {BlockIdContext} from '../../../context/blockIdContext';
import {block} from '../../../utils';

import './ItemWrap.scss';

const b = block('item-wrap');

export interface ItemWrapProps extends PropsWithChildren {
    index: number;
}

const ItemWrap = (props: ItemWrapProps) => {
    const {children, index} = props;
    const parentBlockId = useContext(BlockIdContext);
    const adminBlockMouseEvents = useEditorBlockMouseEvents([parentBlockId, index]);

    return (
        <div className={b()} {...adminBlockMouseEvents}>
            {children}
        </div>
    );
};

export default ItemWrap;
