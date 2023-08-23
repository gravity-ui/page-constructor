import React, {CSSProperties, forwardRef} from 'react';

import {QAProps, Refable} from '../../models/common';
import {WithChildren} from '../../models/react';
import {GridColumnClassParams} from '../types';
import {getColClass} from '../utils';

export interface GridColumnProps extends GridColumnClassParams, Refable<HTMLDivElement>, QAProps {
    style?: CSSProperties;
    children?: React.ReactNode;
    role?: React.AriaRole;
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
