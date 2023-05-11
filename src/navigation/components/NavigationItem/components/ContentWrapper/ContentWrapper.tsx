import React, {Fragment, useMemo} from 'react';

import {Image} from '../../../../../components';
import {ImageProps} from '../../../../../models';
import {block} from '../../../../../utils';

import './ContentWrapper.scss';

const b = block('content-wrapper');

interface ContentWrapperProps {
    text: string;
    icon?: ImageProps;
    iconSize?: number;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({text, icon, iconSize}) => {
    const iconSizeStyle = useMemo(
        () => (iconSize ? {height: `${iconSize}px`, width: `${iconSize}px`} : {}),
        [iconSize],
    );

    return (
        <Fragment>
            {icon && typeof icon !== 'string' && (
                <Image className={b('icon')} {...icon} style={iconSizeStyle} />
            )}
            <span className={b('text')}>{text}</span>
        </Fragment>
    );
};
