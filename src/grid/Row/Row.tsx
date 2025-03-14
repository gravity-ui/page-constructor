import * as React from 'react';

import {ClassNameProps, Refable} from '../../models/common';
import {GridAlignItems, GridJustifyContent} from '../types';
import {AriaProps, Roleable} from '../../models';

export interface RowProps extends ClassNameProps, Refable<HTMLDivElement>, Roleable, AriaProps {
    id?: string;
    justifyContent?: GridJustifyContent;
    alignItems?: GridAlignItems;
    noGutter?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
    const {id, className, justifyContent, alignItems, noGutter, style, role, ariaProps, children} =
        props;

    const getClassName = React.useCallback(() => {
        return ['row', className, justifyContent, alignItems, noGutter && 'no-gutter']
            .filter(Boolean)
            .join(' ');
    }, [className, justifyContent, alignItems, noGutter]);

    return (
        <div ref={ref} id={id} className={getClassName()} style={style} role={role} {...ariaProps}>
            {children}
        </div>
    );
});

Row.displayName = 'Row';
