import React, {useRef, useState, useCallback, useEffect} from 'react';

import {block} from '../../utils';
import HeightCalculator from '../../components/HeightCalculator/HeightCalculator';

import './Foldable.scss';

const b = block('foldable-block');

export interface FoldableProps {
    isOpened: boolean;
    className?: string;
}

const Foldable: React.FunctionComponent<FoldableProps> = ({isOpened, children, className}) => {
    const contenRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>();
    const onHeightCalculation = useCallback((height: number) => {
        setContentHeight(height);
    }, []);

    useEffect(() => {
        if (contenRef && contenRef.current) {
            contenRef.current.style.height = isOpened ? `${contentHeight}px` : '0';
        }
    }, [isOpened, contentHeight]);

    return (
        <div className={b(null, className)}>
            <div ref={contenRef} className={b('content-container', {open: isOpened})}>
                {children}
            </div>
            <HeightCalculator onCalculate={onHeightCalculation}>{children}</HeightCalculator>
        </div>
    );
};

export default Foldable;
