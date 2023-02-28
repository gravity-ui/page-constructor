import React, {forwardRef, useCallback} from 'react';

import {Refable} from '../../models/common';
import {GridAlignItems, GridJustifyContent} from '../types';

const ROW_ROLE = 'pc-row';

export interface RowProps extends Refable<HTMLDivElement> {
    className?: string;
    justifyContent?: GridJustifyContent;
    alignItems?: GridAlignItems;
    noGutter?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Row = forwardRef<HTMLDivElement, RowProps>((props, ref) => {
    const {className, justifyContent, alignItems, noGutter, style, children} = props;

    const getClassName = useCallback(() => {
        return ['row', className, justifyContent, alignItems, noGutter && 'no-gutter']
            .filter(Boolean)
            .join(' ');
    }, [className, justifyContent, alignItems, noGutter]);

    return (
        <div role={ROW_ROLE} ref={ref} className={getClassName()} style={style}>
            {children}
        </div>
    );
});

Row.displayName = 'Row';
