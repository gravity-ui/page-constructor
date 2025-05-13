import * as React from 'react';

import type {ClassNameProps, IconWrapperProps} from '../../models';
import {block} from '../../utils';

import Icon from '../Icon/Icon';
import './IconWrapper.scss';

const b = block('icon-wrapper');

const IconWrapper = (props: React.PropsWithChildren<IconWrapperProps> & ClassNameProps) => {
    const {icon, children, className} = props;
    if (!icon) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    const iconPosition = icon?.position;

    return (
        <div className={b({['icon-position']: iconPosition}, className)}>
            {icon.value && (
                <Icon
                    icon={icon.value}
                    imageProps={{
                        containerClassName: b('icon-container'),
                        className: b('icon', {['icon-position']: iconPosition}),
                    }}
                />
            )}
            <div className={b('content', {['icon-position']: iconPosition})}>{children}</div>
        </div>
    );
};

export default IconWrapper;
