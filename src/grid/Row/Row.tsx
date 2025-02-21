import * as React from 'react';

import {Refable} from '../../models/common';
import {GridAlignItems, GridJustifyContent} from '../types';

export interface RowProps extends Refable<HTMLDivElement> {
    className?: string;
    justifyContent?: GridJustifyContent;
    alignItems?: GridAlignItems;
    noGutter?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
    const {className, justifyContent, alignItems, noGutter, style, children} = props;

    const getClassName = React.useCallback(() => {
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
