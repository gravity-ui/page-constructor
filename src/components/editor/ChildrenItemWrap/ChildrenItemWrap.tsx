import * as React from 'react';

import {usePCEditorChildrenItemWrap} from '../../../hooks/usePCEditorChildrenItemWrap';
import {block} from '../../../utils';

import './ChildrenItemWrap.scss';

const b = block('item-wrap');

export interface ChildrenItemWrapProps extends React.PropsWithChildren {
    index: number;
}

const ChildrenItemWrap = ({index, children}: ChildrenItemWrapProps) => {
    const {blockRef, adminBlockMouseEvents} = usePCEditorChildrenItemWrap(index);
    return (
        <div ref={blockRef} className={b()} {...adminBlockMouseEvents}>
            {children}
        </div>
    );
};

export default ChildrenItemWrap;
