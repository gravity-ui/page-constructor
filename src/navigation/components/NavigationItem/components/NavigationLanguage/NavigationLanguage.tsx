import React from 'react';

import {NavigationItemProps} from '../../NavigationItem';
// import {ContentWrapper} from '../ContentWrapper/ContentWrapper';
// import {ToggleArrow} from '../../../../../components';
import {Button} from '../../../../../components';

import {block} from '../../../../../utils';
// import {getMediaImage} from '../../../../../components/Media/Image/utils';

import {DropdownItemData} from '../../../../../models';

import './NavigationLanguage.scss';

const b = block('navigation-language');

// const TOGGLE_ARROW_SIZE = 12;

type NavigationDropdownProps = NavigationItemProps & DropdownItemData;

export const NavigationLanguage: React.FC<NavigationDropdownProps> = ({
    text,
    // icon,
    // isOpened,
    className,
    onClick: _,
    ...props
}) => {
    // const iconData = icon && getMediaImage(icon);

    return (
        <span {...props} className={b(null, className)}>
            <Button className={className} {...props} text={text} />
            {/* <ContentWrapper text={text} icon={iconData} /> */}
            {/* <ToggleArrow
                className={b('arrow')}
                size={TOGGLE_ARROW_SIZE}
                type={'vertical'}
                iconType="navigation"
                open={isOpened}
            /> */}
        </span>
    );
};
