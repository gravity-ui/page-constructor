import React, {Children, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import _ from 'lodash';

import {WithChildren} from '../../models';
import {block} from '../../utils';

import './HeightCalculator.scss';

const b = block('height-calculator');

export interface HeightCalculatorProps {
    onCalculate: (height: number) => void;
}

/**
 * @deprecated Will be removed, use the useHeightCalculator hook instead.
 * @returns The HeightCalculator component.
 */
const HeightCalculator = ({onCalculate, children}: WithChildren<HeightCalculatorProps>) => {
    const [isCalculating, setIsCalculating] = useState(true);
    const container = useRef<HTMLDivElement>(null);
    const itemRefs = useMemo(() => {
        return Children.map(children, () => React.createRef<HTMLDivElement>()) ?? [];
    }, [children]);

    const calculateContainerHeight = useCallback(() => {
        if (container && container.current && itemRefs.length) {
            const maxHeight = Math.max(
                ...itemRefs.map((tabRef) => {
                    if (tabRef && tabRef.current) {
                        return tabRef.current.offsetHeight;
                    }
                    return 0;
                }),
            );

            onCalculate(maxHeight);
            setIsCalculating(false);
        }
    }, [itemRefs, onCalculate]);

    useEffect(() => {
        const handleResize = _.debounce(() => {
            setIsCalculating(true);
            calculateContainerHeight();
        }, 1000);

        calculateContainerHeight();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [calculateContainerHeight]);

    return isCalculating ? (
        <div className={b()} ref={container}>
            {Children.map(children, (child, index) => {
                return (
                    <div className={b('item-wrapper')} ref={itemRefs[index]} key={index}>
                        {child}
                    </div>
                );
            })}
        </div>
    ) : null;
};

export default HeightCalculator;
