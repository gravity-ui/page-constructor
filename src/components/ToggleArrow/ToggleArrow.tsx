import React from 'react';

import {Icon} from '@gravity-ui/uikit';

import {Chevron, NavigationChevron} from '../../icons';
import {block} from '../../utils';

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

const ToggleArrow = ({
    type = 'horizontal',
    iconType = 'default',
    open = false,
    size = 16,
    thin = false,
    slow = false,
    className,
}: ToggleArrowProps) => (
    <Icon
        className={b({type, open, thin, slow}, className)}
        data={iconType === 'navigation' ? NavigationChevron : Chevron}
        size={size}
    />
);

export default ToggleArrow;
