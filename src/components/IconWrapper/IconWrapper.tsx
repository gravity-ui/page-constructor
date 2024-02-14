import React, {Fragment, PropsWithChildren} from 'react';

import {IconWrapperProps} from '../../models';
import {block} from '../../utils';
import Image from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

import './IconWrapper.scss';

const b = block('icon-wrapper');

type Props = PropsWithChildren<IconWrapperProps> & {
    className?: string;
    iconClassName?: string;
    contentClassName?: string;
};

const IconWrapper = ({icon, className, iconClassName, contentClassName, children}: Props) => {
    if (!icon) {
        return <Fragment>{children}</Fragment>;
    }

    const iconProps = getMediaImage(icon.value);
    const iconPosition = icon?.position;

    return (
        <div className={b({['icon-position']: iconPosition}, className)}>
            {iconProps && <Image {...iconProps} className={b('icon', null, iconClassName)} />}
            <div className={b('content', contentClassName)}>{children}</div>
        </div>
    );
};

export default IconWrapper;
