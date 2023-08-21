import React, {CSSProperties, forwardRef} from 'react';

import {QAProps, Refable, Roleable, WithChildren} from '../../models';
import {GridColumnClassParams} from '../types';
import {getColClass} from '../utils';

export interface GridColumnProps
    extends GridColumnClassParams,
        Refable<HTMLDivElement>,
        QAProps,
        Roleable {
    style?: CSSProperties;
    children?: React.ReactNode;
}

export const Col = forwardRef<HTMLDivElement, WithChildren<GridColumnProps>>((props, ref) => {
    const {children, style, qa, role, ...rest} = props;

    return (
        <div ref={ref} className={getColClass(rest)} style={style} data-qa={qa} role={role}>
            {children}
        </div>
    );
});

Col.displayName = 'Col';
