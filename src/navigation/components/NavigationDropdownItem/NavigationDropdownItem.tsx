import React, {Fragment, MouseEventHandler, useRef} from 'react';

import {NavigationDropdownItem, NavigationItemType} from '../../../models';
import NavigationItem from '../NavigationItem/NavigationItem';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

export interface NavigationDropdownProps {
    className?: string;
    data: NavigationDropdownItem;
    onClick: MouseEventHandler;
    isActive: boolean;
    hidePopup: () => void;
}

const NavigationDropdown: React.FC<NavigationDropdownProps> = ({
    className,
    data,
    isActive,
    hidePopup,
    onClick,
}) => {
    const anchorRef = useRef<HTMLElement>(null);
    const {text, icon, items, ...popupProps} = data;

    return (
        <Fragment>
            <NavigationItem
                className={className}
                ref={anchorRef}
                onClick={onClick}
                isOpened={isActive}
                data={{text, type: NavigationItemType.Dropdown, icon, iconSize: data.iconSize}}
            />
            <NavigationPopup
                open={isActive}
                onClose={hidePopup}
                items={items}
                anchorRef={anchorRef}
                {...popupProps}
            />
        </Fragment>
    );
};

export default NavigationDropdown;
