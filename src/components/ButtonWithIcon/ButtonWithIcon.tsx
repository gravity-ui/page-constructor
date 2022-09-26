import React from 'react';
import block from 'bem-cn-lite';
import {Icon} from '@yandex-cloud/uikit';
import {ClassNameProps} from '@yandex-data-ui/cloud-components';
import {SVGIconData} from '@yandex-cloud/uikit/build/esm/components/Icon/types';

import './ButtonWithIcon.scss';

const b = block('ButtonWithIcon');

export interface ButtonWithIconProps extends ClassNameProps {
    icon: SVGIconData;
    theme?: 'primary' | 'secondary' | 'link' | 'accent';
    size?: 'xs' | 's' | 'm' | 'n';
    iconSize?: number;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent) => void;
}

export const ButtonWithIcon: React.FC<ButtonWithIconProps> = (props) => {
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
