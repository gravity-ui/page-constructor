import * as React from 'react';

import type {ClassNameProps, IconWrapperProps} from '../../models';
import {block} from '../../utils';
import Icon from '../Icon/Icon';

import './IconWrapper.scss';
const b = block('icon-wrapper');

const IconWrapper = (props: React.PropsWithChildren<IconWrapperProps> & ClassNameProps) => {
    const {icon, children, className, size, gravityIcon} = props;
    if (!icon && !gravityIcon) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    const iconPosition = icon?.position;

    const gravityIconPosition = gravityIcon?.position;

    const position = gravityIconPosition || iconPosition;

    return (
        <div className={b({['icon-position']: position}, className)}>
            <Icon
                icon={icon?.value}
                gravityIcon={gravityIcon?.value}
                containerClassName={b('icon-container')}
                className={b('icon', {
                    ['icon-position']: position,
                    size,
                    ['gravity-icon']: Boolean(gravityIcon),
                })}
            />
            <div className={b('content', {['icon-position']: position})}>{children}</div>
        </div>
    );
};

export default IconWrapper;
