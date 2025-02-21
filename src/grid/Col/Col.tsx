import * as React from 'react';

import {QAProps, Refable, Roleable} from '../../models';
import {GridColumnClassParams} from '../types';
import {getColClass} from '../utils';

export interface GridColumnProps
    extends GridColumnClassParams,
        Refable<HTMLDivElement>,
        QAProps,
        Roleable {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Col = React.forwardRef<HTMLDivElement, React.PropsWithChildren<GridColumnProps>>(
    (props, ref) => {
        const {children, style, qa, role, ...rest} = props;

        return (
            <div ref={ref} className={getColClass(rest)} style={style} data-qa={qa} role={role}>
                {children}
            </div>
        );
    },
);

Col.displayName = 'Col';
