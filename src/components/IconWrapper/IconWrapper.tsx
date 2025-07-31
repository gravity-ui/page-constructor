import * as React from 'react';

import type {ClassNameProps, IconWrapperProps} from '../../models';
import {block} from '../../utils';
import Image from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

import './IconWrapper.scss';

const b = block('icon-wrapper');

const IconWrapper = (props: React.PropsWithChildren<IconWrapperProps> & ClassNameProps) => {
    const {icon, children, className, size} = props;
    if (!icon) {
        return <React.Fragment>{children}</React.Fragment>;
    }

    const iconProps = getMediaImage(icon.value);
    const iconPosition = icon?.position;

    return (
        <div className={b({['icon-position']: iconPosition}, className)}>
            {iconProps && (
                <Image
                    {...iconProps}
                    containerClassName={b('icon-container')}
                    className={b('icon', {['icon-position']: iconPosition, size})}
                />
            )}
            <div className={b('content', {['icon-position']: iconPosition})}>{children}</div>
        </div>
    );
};

export default IconWrapper;
