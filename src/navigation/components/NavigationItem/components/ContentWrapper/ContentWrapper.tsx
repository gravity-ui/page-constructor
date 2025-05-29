import * as React from 'react';

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

export const ContentWrapper = ({text, icon, iconSize}: ContentWrapperProps) => {
    const iconSizeStyle = React.useMemo(
        () => (iconSize ? {height: `${iconSize}px`, width: `${iconSize}px`} : {}),
        [iconSize],
    );

    return (
        <React.Fragment>
            {icon && typeof icon !== 'string' && (
                <Image className={b('icon')} {...icon} style={iconSizeStyle} />
            )}
            <span className={b('text')}>{text}</span>
        </React.Fragment>
    );
};
