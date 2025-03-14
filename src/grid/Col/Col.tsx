import * as React from 'react';

import {AriaProps, QAProps, Refable, Roleable} from '../../models';
import {GridColumnClassParams} from '../types';
import {getColClass} from '../utils';

export interface GridColumnProps
    extends GridColumnClassParams,
        Refable<HTMLDivElement>,
        QAProps,
        Roleable,
        AriaProps {
    id?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Col = React.forwardRef<HTMLDivElement, React.PropsWithChildren<GridColumnProps>>(
    (props, ref) => {
        const {id, children, style, qa, role, ariaProps, ...rest} = props;

        return (
            <div
                ref={ref}
                id={id}
                className={getColClass(rest)}
                style={style}
                data-qa={qa}
                role={role}
                {...ariaProps}
            >
                {children}
            </div>
        );
    },
);

Col.displayName = 'Col';
