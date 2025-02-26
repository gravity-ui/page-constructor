import * as React from 'react';

import noop from 'lodash/noop';

import {MobileContext} from '../context/mobileContext';

export default function useFocus(element?: HTMLElement) {
    const isMobile = React.useContext(MobileContext);

    const [hasFocus, setHasFocus] = React.useState(false);
    const setFocus = React.useCallback(() => setHasFocus(true), []);
    const unsetFocus = React.useCallback(() => setHasFocus(false), []);

    React.useEffect(() => {
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
