import React from 'react';

import ToggleArrow from '../../../components/ToggleArrow/ToggleArrow';
import {ClassNameProps} from '../../../models';
import {block} from '../../../utils';
import {i18n} from '../i18n';

import './Arrow.scss';

const b = block('slider-new-block-arrow');

export type ArrowType = 'left' | 'right';

export interface ArrowProps {
    type: ArrowType;
    onClick?: () => void;
    size?: number;
    extraProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Arrow = ({type, onClick, className, size = 16, extraProps}: ArrowProps & ClassNameProps) => (
    <button className={b('button', className)} aria-label={i18n(`arrow-${type}`)} onClick={onClick} {...extraProps}>
        <div className={b('inner', {type})}>
            <span className={b('icon-wrapper')}>
                <ToggleArrow
                    size={size}
                    type={'horizontal'}
                    iconType="navigation"
                    className={b('icon')}
                />
            </span>
        </div>
    </button>
);

export default Arrow;
