import React from 'react';

import {block} from '../../utils';
import {ReactFCC} from '../../models';

import '../styles/bootstrap.scss';
import './Grid.scss';

const b = block('Grid');

export interface GridProps {
    debug?: boolean;
    className?: string;
    containerClass?: string;
    style?: React.CSSProperties;
}

export const Grid: ReactFCC<GridProps> = ({
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
