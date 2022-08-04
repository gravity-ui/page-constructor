import React from 'react';
import {Icon} from '@yandex-cloud/uikit';

import {block} from '../../utils';

import chevron from '../../../assets//icons/chevron.svg';
import navigationChevron from '../../../assets/icons/navigation-chevron.svg';

import './ToggleArrow.scss';

const b = block('ToggleArrow');

export interface ToggleArrowProps {
    type?: 'horizontal' | 'vertical';
    iconType?: 'navigation' | 'default';
    open?: boolean;
    size?: number;
    thin?: boolean;
    slow?: boolean;
    className?: string;
}

const ToggleArrow: React.FC<ToggleArrowProps> = ({
    type = 'horizontal',
    iconType = 'default',
    open = false,
    size = 16,
    thin = false,
    slow = false,
    className,
}) => (
    <Icon
        className={b({type, open, thin, slow}, className)}
        data={iconType === 'navigation' ? navigationChevron : chevron}
        size={size}
    />
);

export default ToggleArrow;
