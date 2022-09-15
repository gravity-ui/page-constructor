import React from 'react';
import {ClassNameProps, ReactFCC} from '../../../models';

import {block} from '../../../utils';
import ToggleArrow from '../../../components/ToggleArrow/ToggleArrow';

import './Arrow.scss';

const b = block('slider-block-arrow');

export type ArrowType = 'left' | 'right';

export interface ArrowProps {
    type: ArrowType;
    handleClick?: (direction: ArrowType) => void;
    size?: number;
}

const Arrow: ReactFCC<ArrowProps & ClassNameProps> = ({
    type,
    handleClick,
    className,
    size = 16,
}) => (
    <div className={b({type}, className)} onClick={() => handleClick && handleClick(type)}>
        <button className={b('button')}>
            <div className={b('icon-wrapper')}>
                <ToggleArrow
                    size={size}
                    type={'horizontal'}
                    iconType="navigation"
                    className={b('icon')}
                />
            </div>
        </button>
    </div>
);

export default Arrow;
