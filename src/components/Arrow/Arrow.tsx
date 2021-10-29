import React from 'react';
import block from 'bem-cn-lite';
import {Icon} from '@yandex-data-ui/common';

import arrow from '../../../assets/icons/arrow-constructor.svg';

import './Arrow.scss';

const b = block('arrow-block');

export type ArrowDirection = 'left' | 'right';

export interface ArrowProps {
    direction?: ArrowDirection;
    className?: string;
    width?: number;
    height?: number;
    onClick?: (direction: ArrowDirection) => void;
}

const Image: React.FunctionComponent<ArrowProps> = ({
    direction = 'left',
    width = 16,
    height = 40,
    onClick,
    className,
}) => (
    <Icon
        data={arrow}
        width={width}
        height={height}
        className={b({direction: direction as string}, className)}
        onClick={onClick && (() => onClick(direction))}
    />
);

export default Image;
