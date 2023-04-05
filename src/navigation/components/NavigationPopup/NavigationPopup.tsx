import React, {useCallback, useEffect, useRef, useState} from 'react';

import _ from 'lodash';

import {Portal} from '@gravity-ui/uikit';

import {OutsideClick} from '../../../components';
import {NavigationLinkItem} from '../../../models';
import {block} from '../../../utils';
import NavigationItem from '../NavigationItem/NavigationItem';

import './NavigationPopup.scss';

const b = block('navigation-popup');

export interface NavigationPopupProps {
    items: NavigationLinkItem[];
    onClose: () => void;
    left?: number;
    className?: string;
}

export const NavigationPopup: React.FC<NavigationPopupProps> = ({items, left, onClose}) => {
    const [calculatedLeft, setCalculatedLeft] = useState(left);
    const popupRef = useRef<HTMLDivElement>(null);

    const calculateLeft = useCallback(() => {
        if (popupRef && popupRef.current && left) {
            const right = left + popupRef.current.offsetWidth;
            const docWidth = document.body.clientWidth;
            const currentLeft = right > docWidth ? left - (right - docWidth) : left;
            setCalculatedLeft(currentLeft);
        } else {
            setCalculatedLeft(left);
        }
    }, [left]);

    useEffect(() => {
        const debounceCalculateLeft = _.debounce(calculateLeft, 100);
        calculateLeft();
        window.addEventListener('resize', debounceCalculateLeft);

        return () => {
            window.removeEventListener('resize', debounceCalculateLeft);
        };
    }, [calculateLeft]);

    useEffect(() => {
        calculateLeft();
    }, [calculateLeft, left]);

    if (!document || !document.body) {
        return null;
    }

    return (
        <Portal>
            <div ref={popupRef} className={b()} style={{left: calculatedLeft}}>
                <OutsideClick onOutsideClick={onClose}>
                    {items.map((item) => (
                        <NavigationItem key={item.text} className={b('link')} data={item} />
                    ))}
                </OutsideClick>
            </div>
        </Portal>
    );
};

export default NavigationPopup;
