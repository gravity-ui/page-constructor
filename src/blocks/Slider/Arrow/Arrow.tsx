import React from 'react';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';

import {block} from '../../../utils';
import ToggleArrow from '../../../components/ToggleArrow/ToggleArrow';

import './Arrow.scss';

const b = block('slider-block-arrow');

export type ArrowType = 'left' | 'right';

export interface ArrowProps {
    type: ArrowType;
    handleClick?: (direction: ArrowType) => void;
}

const Arrow: React.FunctionComponent<ArrowProps & ClassNameProps> = ({
    type,
    handleClick,
    className,
}) => (
    <div className={b({type}, className)} onClick={() => handleClick && handleClick(type)}>
        <button className={b('button')}>
            <div className={b('icon-wrapper')}>
                <ToggleArrow
                    size={16}
                    type={'horizontal'}
                    iconType="navigation"
                    className={b('icon')}
                />
            </div>
        </button>
    </div>
);

export default Arrow;
