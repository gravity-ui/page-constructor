import * as React from 'react';

import {usePCEditorItemWrap} from '../../../hooks/usePCEditorItemWrap';
import {block} from '../../../utils';

import './ChildrenWrap.scss';

const b = block('children-wrap');

export interface ChildrenWrapProps extends React.PropsWithChildren {
    checkChildren?: React.ReactNode;
}

const ChildrenWrap = ({children}: ChildrenWrapProps) => {
    const {
        blockRef,
        adminBlockMouseEvents: {onMouseMove, onMouseUp},
    } = usePCEditorItemWrap();

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div ref={blockRef} className={b()} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            {children}
        </div>
    );
};

export default ChildrenWrap;
