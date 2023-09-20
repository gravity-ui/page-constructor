import {useCallback, useContext, useEffect, useState} from 'react';

import noop from 'lodash/noop';

import {MobileContext} from '../context/mobileContext';

export default function useFocus(element?: HTMLElement) {
    const isMobile = useContext(MobileContext);

    const [hasFocus, setHasFocus] = useState(false);
    const setFocus = useCallback(() => setHasFocus(true), []);
    const unsetFocus = useCallback(() => setHasFocus(false), []);

    useEffect(() => {
        if (element) {
            if (isMobile) {
                element.addEventListener('pointerdown', setFocus, {passive: true});
            } else {
                element.addEventListener('mouseenter', setFocus, {passive: true});
                element.addEventListener('mouseleave', unsetFocus, {passive: true});
            }

            return () => {
                if (isMobile) {
                    element.removeEventListener('pointerdown', setFocus);
                } else {
                    element.removeEventListener('mouseenter', setFocus);
                    element.removeEventListener('mouseleave', unsetFocus);
                }
            };
        }

        return noop;
    }, [element, isMobile, setFocus, unsetFocus]);

    return {
        hasFocus,
        setFocus,
        unsetFocus,
    };
}
