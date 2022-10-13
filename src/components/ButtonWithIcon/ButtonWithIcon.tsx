import React from 'react';
import {Icon} from '@gravity-ui/uikit';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SVGIconData} from '@gravity-ui/uikit/build/esm/components/Icon/types';

import {block} from '../../utils/cn';

import './ButtonWithIcon.scss';

const b = block('button-with-icon');

export interface ButtonWithIconProps extends ClassNameProps {
    icon: SVGIconData;
    theme?: 'primary' | 'secondary' | 'link' | 'accent';
    size?: 'xs' | 's' | 'm' | 'n';
    iconSize?: number;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent) => void;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
    icon,
    theme = 'primary',
    size = 's',
    iconSize = 16,
    disabled = false,
    onClick,
    className,
}) => (
    <button
        type="button"
        className={b({size, theme, disabled}, className)}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
    >
        <Icon data={icon} size={iconSize} />
    </button>
);
