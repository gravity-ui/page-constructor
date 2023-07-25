import React from 'react';

import {Popup} from '@gravity-ui/uikit';

import {NavigationLinkItem} from '../../../models';
import {block} from '../../../utils';
import NavigationItem from '../NavigationItem/NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');
const OFFSET_RESET: [number, number] = [0, 0];

export interface NavigationPopupProps {
    open: boolean;
    items: NavigationLinkItem[];
    onClose: () => void;
    className?: string;
    anchorRef: React.RefObject<Element>;
}

export const NavigationPopup: React.FC<NavigationPopupProps> = ({
    anchorRef,
    items,
    onClose,
    className,
    open,
}) => {
    return (
        <Popup
            // Workaround to recalculate position on every opening. Required for valid position calculation for scrolled header links.
            anchorRef={open ? anchorRef : undefined}
            contentClassName={b(null, className)}
            open={open}
            onClose={onClose}
            onOutsideClick={onClose}
            keepMounted
            disablePortal
            strategy="fixed"
            placement="bottom-start"
            offset={OFFSET_RESET}
        >
            {items.map((item) => (
                <NavigationItem key={item.text} className={b('link')} data={item} />
            ))}
        </Popup>
    );
};

export default NavigationPopup;
