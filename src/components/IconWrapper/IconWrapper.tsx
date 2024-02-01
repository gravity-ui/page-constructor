import React, {Fragment, PropsWithChildren} from 'react';

import {IconWrapperProps} from '../../models';
import {block} from '../../utils';
import Image from '../Image/Image';
import {getMediaImage} from '../Media/Image/utils';

import './IconWrapper.scss';

const b = block('icon-wrapper');

const IconWrapper = (props: PropsWithChildren<IconWrapperProps>) => {
    const {icon, children} = props;
    if (!icon) {
        return <Fragment>{children}</Fragment>;
    }

    const iconProps = getMediaImage(icon.value);
    const iconPosition = icon?.position;

    return (
        <div className={b({['icon-position']: iconPosition})}>
            {iconProps && (
                <Image {...iconProps} className={b('icon', {['icon-position']: iconPosition})} />
            )}
            <div className={b({['content']: iconPosition})}>{children}</div>
        </div>
    );
};

export default IconWrapper;
