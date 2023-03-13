import React, {Fragment, MouseEventHandler} from 'react';

import {NavigationDropdownItem, NavigationItemType} from '../../../models';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

export interface NavigationDropdownProps {
    data: NavigationDropdownItem;
    onClick: MouseEventHandler;
    isActive: boolean;
    position: number;
    hidePopup: () => void;
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    data,
    isActive,
    position,
    hidePopup,
    onClick,
}) => {
    const {text, icon, items, ...popupProps} = data;

    return (
        <Fragment>
            <NavigationItem
                onClick={onClick}
                isOpened={isActive}
                data={{text, type: NavigationItemType.Dropdown, icon}}
            />
            {isActive && (
                <NavigationPopup
                    left={position}
                    onClose={hidePopup}
                    items={items}
                    {...popupProps}
                />
            )}
        </Fragment>
    );
};

export default NavigationDropdown;
