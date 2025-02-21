import React, {PropsWithChildren, ReactNode, useCallback, useContext, useState} from 'react';

import {BlockIdContext} from '../../../context/blockIdContext';
import usePCEditorBlockMouseEvents from '../../../hooks/usePCEditorBlockMouseEvents';
import {block} from '../../../utils';

import './ChildrenWrap.scss';

const b = block('children-wrap');

export interface ChildrenWrapProps extends PropsWithChildren {
    checkChildren?: ReactNode;
}

const ChildrenWrap = (props: ChildrenWrapProps) => {
    const {children} = props;
    const [element, setElement] = useState<HTMLElement | undefined>();
    const blockRef = useCallback((node: HTMLElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);
    const parentBlockId = useContext(BlockIdContext);
    const {onMouseUp, onMouseMove} = usePCEditorBlockMouseEvents([parentBlockId, 0], element);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div ref={blockRef} className={b()} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            {children}
        </div>
    );
};

export default ChildrenWrap;
