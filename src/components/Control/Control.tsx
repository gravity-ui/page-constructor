import React from 'react';

import {Button, ButtonSize, Icon} from '@gravity-ui/uikit';
import {SVGIconData} from '@gravity-ui/uikit/build/esm/components/Icon/types';

import {block} from '../../utils';

import {i18n} from './i18n';

import './Control.scss';

const b = block('control');

export const defaultIconId = 'icon-test-id';

export interface ControlProps {
    icon: SVGIconData;
    theme?: 'primary' | 'secondary' | 'link' | 'accent';
    size?: ButtonSize;
    iconSize?: number;
    disabled?: boolean;
    className?: string;
    onClick?: (event: React.MouseEvent) => void;
    qa?: string;
}

const Control = (props: ControlProps) => {
    const {
        icon,
        theme = 'primary',
        size = 's',
        iconSize = 16,
        disabled = false,
        onClick,
        className,
        qa,
    } = props;

    return (
        <Button
            type={'button'}
            aria-label={i18n('aria-label')}
            className={b({theme, disabled}, className)}
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            qa={qa}
            size={size}
            view={'flat'}
        >
            <Button.Icon>
                <Icon data={icon} size={iconSize} qa={defaultIconId} />
            </Button.Icon>
        </Button>
    );
};

export default Control;
