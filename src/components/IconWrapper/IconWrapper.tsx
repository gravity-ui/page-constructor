import * as React from 'react';

import type {ClassNameProps, IconWrapperProps} from '../../models';
import {block} from '../../utils';

import Icon from '../Icon/Icon';
import './IconWrapper.scss';
import {getMediaImage} from '../Media/Image/utils';
import Image from '../Image/Image';

const b = block('icon-wrapper');

const IconWrapper = (props: React.PropsWithChildren<IconWrapperProps> & ClassNameProps) => {
    const {icon, children, className, gravityIcon} = props;
    if (!icon && !gravityIcon) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    const iconPosition = icon?.position;
    const iconProps = icon ? getMediaImage(icon.value) : undefined;

    return (
        <div className={b({['icon-position']: iconPosition}, className)}>
            {iconProps && (
                <Image
                    {...iconProps}
                    containerClassName={b('icon-container')}
                    className={b('icon', {['icon-position']: iconPosition})}
                />
            )}
            {gravityIcon?.value && (
                <Icon
                    icon={gravityIcon?.value}
                    className={b('icon', {['icon-position']: iconPosition})}
                />
            )}
            <div className={b('content', {['icon-position']: iconPosition})}>{children}</div>
        </div>
    );
};

export default IconWrapper;
