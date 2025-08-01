import * as React from 'react';

import {block} from '../../utils';

import './Grid.scss';
import '../styles/bootstrap.scss';

const b = block('Grid');

export interface GridProps {
    debug?: boolean;
    className?: string;
    containerClass?: string;
    style?: React.CSSProperties;
}

export const Grid = ({
    debug,
    children,
    className,
    style,
    containerClass = '',
}: React.PropsWithChildren<GridProps>) => (
    <div style={style} className={b({debug}, className)}>
        <div className={`container-fluid ${containerClass}`}>{children}</div>
    </div>
);
