import * as React from 'react';

import {Popup} from '@gravity-ui/uikit';

import {block} from '../../../utils';
import {NavigationLayout, NavigationPopupProps} from '../../models';
import NavigationItem from '../NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');
const OFFSET_RESET: {mainAxis?: number; crossAxis?: number} = {mainAxis: 0, crossAxis: 0};

export const NavigationPopup = ({
    anchorRef,
    items,
    onClose,
    open,
}: React.PropsWithChildren<NavigationPopupProps>) => {
    // Opening and closing is controlled by the associated button,
    // but in order to give the popup control over closing as well (e.g. on click outside or escape key press)
    // there needs to be an awkward looking handler like this.
    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            onClose();
        }
    };

    return (
        <Popup
            className={b()}
            // Workaround to recalculate position on every opening. Required for valid position calculation for scrolled header links.
            anchorElement={anchorRef.current}
            open={open}
            onOpenChange={onOpenChange}
            keepMounted
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
};

export default NavigationPopup;
