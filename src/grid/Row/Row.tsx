import React, {forwardRef, useCallback} from 'react';

import {GridJustifyContent, GridAlignItems} from '../types';
import {Refable} from '../../models/common';

export interface IRowProps extends Refable<HTMLDivElement> {
    className?: string;
    justifyContent?: GridJustifyContent;
    alignItems?: GridAlignItems;
    noGutter?: boolean;
    style?: React.CSSProperties;
}

export const Row: React.FC<IRowProps> = forwardRef<HTMLDivElement, IRowProps>((props, ref) => {
    const {className, justifyContent, alignItems, noGutter, style, children} = props;

    const getClassName = useCallback(() => {
        return ['row', className, justifyContent, alignItems, noGutter && 'no-gutter']
            .filter(Boolean)
            .join(' ');
    }, [className, justifyContent, alignItems, noGutter]);

    return (
        <div ref={ref} className={getClassName()} style={style}>
            {children}
        </div>
    );
});

Row.displayName = 'Row';
