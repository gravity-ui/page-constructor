import React, {CSSProperties, forwardRef} from 'react';

import {getColClass} from '../utils';
import {GridColumnClassParams} from '../types';
import {Refable} from '../../models/common';
import {WithChildren} from '../../models/react';

export interface GridColumnProps extends GridColumnClassParams, Refable<HTMLDivElement> {
    style?: CSSProperties;
    dataQa?: string;
    children?: React.ReactNode;
}

export const Col = forwardRef<HTMLDivElement, WithChildren<GridColumnProps>>((props, ref) => {
    const {children, style, dataQa, ...rest} = props;

    return (
        <div ref={ref} className={getColClass(rest)} style={style} data-qa={dataQa}>
            {children}
        </div>
    );
});

Col.displayName = 'Col';
