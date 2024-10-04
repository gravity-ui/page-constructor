import React, {PropsWithChildren, ReactNode, useContext} from 'react';

import useEditorBlockMouseEvents from '../../../containers/PageConstructor/components/ConstructorBlock/hooks/useEditorBlockMouseEvents';
import {BlockIdContext} from '../../../context/blockIdContext';
import {block} from '../../../utils';

import './ChildrenWrap.scss';

const b = block('children-wrap');

export interface ChildrenWrapProps extends PropsWithChildren {
    checkChildren?: ReactNode;
}

const ChildrenWrap = (props: ChildrenWrapProps) => {
    const {children} = props;
    const parentBlockId = useContext(BlockIdContext);
    const {onMouseUp, onMouseMove} = useEditorBlockMouseEvents([parentBlockId, 0]);

    return (
        <div className={b()} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            {children}
        </div>
    );
};

export default ChildrenWrap;
