import React from 'react';

import {Popup} from '@gravity-ui/uikit';

import {block} from '../../../utils';
import {NavigationLayout, NavigationPopupProps} from '../../models';
import NavigationItem from '../NavigationItem/NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');
const OFFSET_RESET: [number, number] = [0, 0];

export const NavigationPopup: React.FC<NavigationPopupProps> = ({
    anchorRef,
    items,
    onClose,
    className,
    open,
}) => (
    <Popup
        // Workaround to recalculate position on every opening. Required for valid position calculation for scrolled header links.
        anchorRef={open ? anchorRef : undefined}
        className={b(null, className)}
        open={open}
        onClose={onClose}
        onOutsideClick={onClose}
        keepMounted
        disablePortal
        strategy="fixed"
        placement="bottom-start"
        offset={OFFSET_RESET}
    >
        <ul className={b('list')}>
            {items.map((item) => (
                <NavigationItem
                    key={item.text}
                    className={b('link')}
                    data={item}
                    menuLayout={NavigationLayout.Dropdown}
                />
            ))}
        </ul>
    </Popup>
);

export default NavigationPopup;
