import React from 'react';

import {NavigationItemProps} from '../../NavigationItem';
import {ContentWrapper} from '../ContentWrapper/ContentWrapper';
import {ToggleArrow} from '../../../../../components';

import {block} from '../../../../../utils';
import {getMediaImage} from '../../../../../components/Media/Image/utils';

import {DropdownItemData} from '../../../../../models';

import './NavigationDropdown.scss';

const b = block('navigation-dropdown');

const TOGGLE_ARROW_SIZE = 12;

type NavigationDropdownProps = NavigationItemProps & DropdownItemData;

export const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    text,
    icon,
    isOpened,
    ...props
}) => {
    const iconData = icon && getMediaImage(icon);

    return (
        <span {...props}>
            <ContentWrapper text={text} icon={iconData} />
            <ToggleArrow
                className={b()}
                size={TOGGLE_ARROW_SIZE}
                type={'vertical'}
                iconType="navigation"
                open={isOpened}
            />
        </span>
    );
};
