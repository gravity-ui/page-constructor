import * as React from 'react';

import {usePCEditorChildrenItemWrap} from '../../../hooks/usePCEditorChildrenItemWrap';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';

import './ChildrenItemWrap.scss';

const b = block('item-wrap');

export interface ChildrenItemWrapProps extends React.PropsWithChildren<ClassNameProps> {
    index: number;
}

const ChildrenItemWrap = ({index, children, className}: ChildrenItemWrapProps) => {
    const {blockRef} = usePCEditorChildrenItemWrap(index);
    return (
        <div ref={blockRef} className={b(null, className)}>
            {children}
        </div>
    );
};

export default ChildrenItemWrap;
