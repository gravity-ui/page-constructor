import * as React from 'react';

import {Popup} from '@gravity-ui/uikit';

import {block} from '../../../utils';
import {NavigationLayout, NavigationPopupProps} from '../../models';
import NavigationItem from '../NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');
const OFFSET_RESET: {mainAxis?: number; crossAxis?: number} = {mainAxis: 0, crossAxis: 0};

export const NavigationPopup: React.FC<NavigationPopupProps> = ({
    anchorRef,
    items,
    onClose,
    open,
}) => (
    <Popup
        // Workaround to recalculate position on every opening. Required for valid position calculation for scrolled header links.
        anchorRef={open ? anchorRef : undefined}
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
