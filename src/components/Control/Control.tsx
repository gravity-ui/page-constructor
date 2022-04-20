import React from 'react';
import {Icon} from '@yandex-cloud/uikit';

import {block} from '../../utils';

import './Control.scss';

const b = block('control');

export interface ControlProps {
    icon: SVGIconData;
    theme?: 'primary' | 'secondary' | 'link' | 'accent';
    size?: 'xs' | 's' | 'm' | 'l';
    iconSize?: number;
    disabled?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
}

const Control: React.FC<ControlProps> = (props) => {
    const {
        icon,
        theme = 'primary',
        size = 's',
        iconSize = 16,
        disabled = false,
        onClick,
        className,
    } = props;

    return (
        <button
            type="button"
            className={b({size, theme, disabled}, className)}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
        >
            <Icon data={icon} size={iconSize} />
        </button>
    );
};

export default Control;
