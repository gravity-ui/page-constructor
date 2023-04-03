import React, {useEffect, useRef} from 'react';

import useHeightCalculator from '../../hooks/useHeightCalculator';
import {WithChildren} from '../../models';
import {block} from '../../utils';

import './Foldable.scss';

const b = block('foldable-block');

export interface FoldableProps {
    isOpened: boolean;
    className?: string;
}

const Foldable = ({isOpened, children, className}: WithChildren<FoldableProps>) => {
    const blockRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const contentHeight = useHeightCalculator(contentRef);

    useEffect(() => {
        if (blockRef && blockRef.current) {
            blockRef.current.style.height = isOpened && contentHeight ? `${contentHeight}px` : '0';
        }
    }, [isOpened, contentHeight]);

    return (
        <div ref={blockRef} className={b({open: isOpened}, className)}>
            <div ref={contentRef} className={b('content-container')}>
                {children}
            </div>
        </div>
    );
};

export default Foldable;
