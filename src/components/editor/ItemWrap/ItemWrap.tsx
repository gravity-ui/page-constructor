import React, {PropsWithChildren, useCallback, useContext, useState} from 'react';

import useEditorBlockMouseEvents from '../../../containers/PageConstructor/components/ConstructorBlock/hooks/useEditorBlockMouseEvents';
import {BlockIdContext} from '../../../context/blockIdContext';
import {block} from '../../../utils';

import './ItemWrap.scss';

const b = block('item-wrap');

export interface ItemWrapProps extends PropsWithChildren {
    index: number;
}

const ItemWrap = (props: ItemWrapProps) => {
    const [element, setElement] = useState<HTMLElement | undefined>();
    const blockRef = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);
    const {children, index} = props;
    const parentBlockId = useContext(BlockIdContext);
    const adminBlockMouseEvents = useEditorBlockMouseEvents([parentBlockId, index], element);

    return (
        <div ref={blockRef} className={b()} {...adminBlockMouseEvents}>
            {children}
        </div>
    );
};

export default ItemWrap;
