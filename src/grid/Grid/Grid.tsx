import React from 'react';
import block from 'bem-cn-lite';

import '../styles/bootstrap.scss';
import './Grid.scss';

const b = block('Grid');

export interface GridProps {
    debug?: boolean;
    className?: string;
    containerClass?: string;
    style?: React.CSSProperties;
}

export const Grid: React.FunctionComponent<GridProps> = ({
    debug,
    children,
    className,
    style,
    containerClass = '',
}) => (
    <div style={style} className={b({debug}, className)}>
        <div className={`container-fluid ${containerClass}`}>{children}</div>
    </div>
);
